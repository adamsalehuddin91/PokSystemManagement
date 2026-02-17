<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Profit & Loss Statement</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 20mm 18mm 20mm 18mm;
        }

        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
        }

        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 5px;
        }

        .report-title {
            font-size: 20px;
            color: #444;
            margin-bottom: 5px;
        }

        .period {
            font-size: 14px;
            color: #666;
        }

        .section {
            margin-bottom: 25px;
        }

        .section-header {
            font-size: 12px;
            text-transform: uppercase;
            color: #666;
            border-bottom: 1px solid #ddd;
            margin-bottom: 10px;
            padding-bottom: 5px;
        }

        .row {
            display: flex;
            /* dompdf doesn't support flex well, using tables usually better */
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }

        th,
        td {
            padding: 8px 0;
            text-align: left;
        }

        .amount {
            text-align: right;
            font-family: 'Courier New', monospace;
        }

        .total-row td {
            border-top: 1px solid #ddd;
            font-weight: bold;
            padding-top: 10px;
        }

        .grand-total {
            background-color: #f8f9fa;
            border-top: 2px solid #333;
            border-bottom: 2px solid #333;
        }

        .grand-total td {
            padding: 15px 0;
            font-size: 16px;
            font-weight: bold;
        }

        .text-red {
            color: #dc2626;
        }

        .text-green {
            color: #16a34a;
        }

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30px;
            font-size: 10px;
            color: #999;
            text-align: center;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
    </style>
</head>

<body>
    <div class="header">
        <div class="company-name">{{ config('company.name') }}</div>
        <div style="font-size: 10px; margin-bottom: 3px;">Co. Reg : ( {{ config('company.reg_no') }} ) &nbsp;&nbsp; TIN : {{ config('company.tin') }}</div>
        <div style="font-size: 10px;">{{ config('company.address_line1') }} {{ config('company.address_line2') }}</div>
        <div style="font-size: 10px; margin-bottom: 8px;">Tel: {{ config('company.phone') }} &nbsp;&nbsp; Email: {{ config('company.email') }}</div>
        <div class="report-title">Profit & Loss Statement</div>
        <div class="period">Period: {{ \Carbon\Carbon::parse($start_date)->format('d M Y') }} -
            {{ \Carbon\Carbon::parse($end_date)->format('d M Y') }}</div>
    </div>

    <!-- Revenue Section -->
    <div class="section">
        <div class="section-header">Income</div>
        <table>
            <tr>
                <td>Total Revenue</td>
                <td class="amount text-green">RM {{ number_format($report['revenue'], 2) }}</td>
            </tr>
            <tr>
                <td>Cost of Goods Sold (COGS)</td>
                <td class="amount text-red">(RM {{ number_format($report['cogs'], 2) }})</td>
            </tr>
            <tr class="total-row">
                <td>Gross Profit</td>
                <td class="amount">RM {{ number_format($report['gross_profit'], 2) }}</td>
            </tr>
        </table>
    </div>

    <!-- Expenses Section -->
    <div class="section">
        <div class="section-header">Operating Expenses</div>
        <table>
            @foreach($report['expenses_by_category'] as $category => $amount)
                <tr>
                    <td style="text-transform: capitalize;">{{ str_replace('_', ' ', $category) }}</td>
                    <td class="amount">RM {{ number_format($amount, 2) }}</td>
                </tr>
            @endforeach

            @if(count($report['expenses_by_category']) == 0)
                <tr>
                    <td colspan="2" style="font-style: italic; color: #999;">No operating expenses recorded.</td>
                </tr>
            @endif

            <tr class="total-row">
                <td>Total Expenses</td>
                <td class="amount text-red">(RM {{ number_format($report['expenses'], 2) }})</td>
            </tr>
        </table>
    </div>

    <!-- Net Profit Section -->
    <div class="section">
        <table>
            <tr class="grand-total">
                <td>Net Profit / (Loss)</td>
                <td class="amount {{ $report['net_profit'] >= 0 ? 'text-green' : 'text-red' }}">
                    RM {{ number_format($report['net_profit'], 2) }}
                </td>
            </tr>
        </table>
        <div style="text-align: right; margin-top: 5px; font-size: 12px; color: #666;">
            Net Margin: {{ number_format($report['net_profit_margin'], 2) }}%
        </div>
    </div>

    <div class="footer">
        Generated on {{ now()->format('d M Y H:i:s') }}
    </div>
</body>

</html>