<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Invoice - {{ $invoice->invoice_number }}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 20mm 18mm 20mm 18mm;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            color: #000;
            margin: 0;
            padding: 0;
        }

        .company-header {
            text-align: center;
            margin-bottom: 10px;
        }

        .company-name {
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .company-detail {
            font-size: 10px;
            margin-top: 2px;
        }

        .doc-title-row {
            text-align: right;
            margin-top: 15px;
            margin-bottom: 15px;
        }

        .doc-title {
            font-size: 18px;
            font-weight: bold;
            text-decoration: underline;
            letter-spacing: 2px;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        .info-table td {
            vertical-align: top;
            padding: 2px 0;
            font-size: 11px;
        }

        .info-table .label-col {
            width: 60px;
        }

        .info-table .right-label {
            width: 65px;
        }

        .to-company {
            font-weight: bold;
            font-size: 12px;
        }

        .doc-no {
            font-weight: bold;
            font-size: 13px;
        }

        .status-badge {
            padding: 2px 8px;
            font-size: 10px;
            font-weight: bold;
            border: 1px solid #999;
        }

        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        .items-table th {
            background-color: #e8e8e8;
            padding: 7px 8px;
            text-align: center;
            font-weight: bold;
            font-size: 10px;
            border: 1px solid #000;
            text-transform: uppercase;
        }

        .items-table td {
            padding: 5px 8px;
            border-left: 1px solid #000;
            border-right: 1px solid #000;
            vertical-align: top;
            font-size: 11px;
        }

        .items-table .item-row td {
            border-bottom: none;
        }

        .items-table .spacer-row td {
            height: 8px;
            border-bottom: none;
        }

        .items-table .summary-row td {
            border-top: 1px solid #000;
            font-weight: bold;
            padding: 5px 8px;
        }

        .items-table .total-row td {
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            font-weight: bold;
            font-size: 12px;
            padding: 7px 8px;
        }

        .text-center { text-align: center; }
        .text-right { text-align: right; }

        .notes-section {
            margin-top: 15px;
            font-size: 10px;
        }

        .payment-history {
            margin-top: 20px;
            font-size: 10px;
        }

        .payment-history table {
            width: 60%;
            border-collapse: collapse;
            margin-top: 5px;
        }

        .payment-history th,
        .payment-history td {
            padding: 4px 8px;
            border: 1px solid #ccc;
            font-size: 10px;
        }

        .payment-history th {
            background-color: #f0f0f0;
        }

        .sig-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 50px;
        }

        .sig-table td {
            width: 50%;
            vertical-align: top;
            padding: 0 15px;
            font-size: 10px;
        }

        .sig-space {
            height: 60px;
        }

        .sig-line {
            border-top: 1px solid #000;
            text-align: center;
            padding-top: 5px;
        }

        .sig-company {
            text-align: center;
            font-weight: bold;
            margin-top: 3px;
        }

        .footer {
            margin-top: 15px;
            font-size: 9px;
            color: #666;
        }
    </style>
</head>

<body>
    {{-- Company Header --}}
    <div class="company-header">
        <div class="company-name">{{ config('company.name') }}</div>
        <div class="company-detail">Co. Reg : ( {{ config('company.reg_no') }} ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TIN : {{ config('company.tin') }}</div>
        <div class="company-detail">{{ config('company.address_line1') }}</div>
        <div class="company-detail">{{ config('company.address_line2') }}</div>
        <div class="company-detail">Tel: {{ config('company.phone') }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: {{ config('company.email') }}</div>
    </div>

    {{-- Document Title --}}
    <div class="doc-title-row">
        <span class="doc-title">INVOICE</span>
    </div>

    {{-- Info Section --}}
    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="width: 58%; vertical-align: top; padding: 0;">
                <table class="info-table">
                    <tr>
                        <td class="label-col">Bill To:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><span class="to-company">{{ strtoupper($invoice->customer->company_name ?? $invoice->customer->name) }}</span></td>
                    </tr>
                    @if($invoice->customer->address)
                    <tr>
                        <td></td>
                        <td>{{ $invoice->customer->address }}</td>
                    </tr>
                    @endif
                    @if($invoice->customer->tax_id)
                    <tr>
                        <td class="label-col">Tax ID:</td>
                        <td>{{ $invoice->customer->tax_id }}</td>
                    </tr>
                    @endif
                    <tr><td colspan="2" style="height: 10px;"></td></tr>
                    <tr>
                        <td class="label-col">Attn:</td>
                        <td>{{ $invoice->customer->name }}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Tel:</td>
                        <td>{{ $invoice->customer->phone ?? '' }}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Email:</td>
                        <td>{{ $invoice->customer->email ?? '' }}</td>
                    </tr>
                </table>
            </td>
            <td style="width: 42%; vertical-align: top; padding: 0;">
                <table class="info-table">
                    <tr>
                        <td class="right-label">No.:</td>
                        <td><span class="doc-no">INV - {{ $invoice->invoice_number }}</span></td>
                    </tr>
                    <tr>
                        <td class="right-label">Date:</td>
                        <td>{{ $invoice->created_at->format('d/m/Y') }}</td>
                    </tr>
                    <tr>
                        <td class="right-label">Due Date:</td>
                        <td>{{ \Carbon\Carbon::parse($invoice->due_date)->format('d/m/Y') }}</td>
                    </tr>
                    <tr>
                        <td class="right-label">Status:</td>
                        <td><span class="status-badge">{{ strtoupper($invoice->payment_status) }}</span></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    {{-- Items Table --}}
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 6%;">No</th>
                <th style="width: 36%;">Description</th>
                <th style="width: 8%;">Qty</th>
                <th style="width: 8%;">Unit</th>
                <th style="width: 19%;">Unit Price (RM)</th>
                <th style="width: 23%;">Total (RM)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->items as $index => $item)
                <tr class="item-row">
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td>
                        <strong>{{ strtoupper($item->sku->name) }}</strong>
                        @if($item->description)
                            <br><span style="font-size: 10px; color: #333;">{{ $item->description }}</span>
                        @endif
                    </td>
                    <td class="text-center">{{ $item->quantity }}</td>
                    <td class="text-center">UNIT</td>
                    <td class="text-right">{{ number_format($item->unit_price, 2) }}</td>
                    <td class="text-right">{{ number_format($item->total_price, 2) }}</td>
                </tr>
                <tr class="spacer-row"><td colspan="6"></td></tr>
            @endforeach

            @for($i = count($invoice->items); $i < 8; $i++)
                <tr class="spacer-row"><td colspan="6">&nbsp;</td></tr>
            @endfor

            <tr class="summary-row">
                <td colspan="5" class="text-right" style="padding-right: 15px;">Subtotal (RM)</td>
                <td class="text-right">{{ number_format($invoice->subtotal, 2) }}</td>
            </tr>

            @if($invoice->tax_amount > 0)
            <tr class="summary-row">
                <td colspan="5" class="text-right" style="padding-right: 15px;">Tax (RM)</td>
                <td class="text-right">{{ number_format($invoice->tax_amount, 2) }}</td>
            </tr>
            @endif

            <tr class="total-row">
                <td colspan="5" class="text-right" style="padding-right: 15px;"><strong>TOTAL AMOUNT (RM)</strong></td>
                <td class="text-right"><strong>{{ number_format($invoice->total_amount, 2) }}</strong></td>
            </tr>
        </tbody>
    </table>

    @if($invoice->notes)
        <div class="notes-section">
            <strong>Notes:</strong> {{ $invoice->notes }}
        </div>
    @endif

    {{-- Payment History --}}
    @if($invoice->receipts->count() > 0)
        <div class="payment-history">
            <strong>Payment History:</strong>
            <table>
                <thead>
                    <tr>
                        <th>Receipt No.</th>
                        <th>Date</th>
                        <th>Method</th>
                        <th style="text-align: right;">Amount (RM)</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($invoice->receipts as $receipt)
                        <tr>
                            <td>{{ $receipt->receipt_number }}</td>
                            <td>{{ \Carbon\Carbon::parse($receipt->payment_date)->format('d/m/Y') }}</td>
                            <td>{{ ucfirst($receipt->payment_method) }}</td>
                            <td style="text-align: right;">{{ number_format($receipt->amount_paid, 2) }}</td>
                        </tr>
                    @endforeach
                    <tr style="font-weight: bold;">
                        <td colspan="3" style="text-align: right;">Total Paid:</td>
                        <td style="text-align: right;">{{ number_format($invoice->receipts->sum('amount_paid'), 2) }}</td>
                    </tr>
                    <tr style="font-weight: bold;">
                        <td colspan="3" style="text-align: right;">Balance Due:</td>
                        <td style="text-align: right;">{{ number_format($invoice->total_amount - $invoice->receipts->sum('amount_paid'), 2) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    @endif

    {{-- Signature Section --}}
    <table class="sig-table">
        <tr>
            <td class="sig-space"></td>
            <td class="sig-space"></td>
        </tr>
        <tr>
            <td>
                <div class="sig-line">Prepared By</div>
                <div class="sig-company">{{ config('company.name') }} ( {{ config('company.reg_no') }} )</div>
            </td>
            <td>
                <div class="sig-line">Customer Acknowledgement</div>
                <div class="sig-company">( COMPANY COP & SIGNATURE )</div>
            </td>
        </tr>
    </table>

    <div class="footer">
        <p>Thank you for your business!</p>
        <p>Generated on {{ now()->format('d M Y H:i') }}</p>
    </div>

</body>

</html>
