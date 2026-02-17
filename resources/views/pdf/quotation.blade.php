<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Quotation - {{ $quotation->quotation_number }}</title>
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
            width: 75px;
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

        .validity-section {
            margin-top: 10px;
            font-size: 10px;
            padding: 5px 0;
            border-top: 1px dashed #999;
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

        .watermark {
            position: fixed;
            top: 40%;
            left: 15%;
            font-size: 80px;
            font-weight: bold;
            color: rgba(200, 200, 200, 0.3);
            transform: rotate(-30deg);
            z-index: -1;
        }
    </style>
</head>

<body>
    {{-- Watermark for draft/sent --}}
    @if(in_array($quotation->status, ['draft', 'sent']))
        <div class="watermark">{{ strtoupper($quotation->status) }}</div>
    @endif

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
        <span class="doc-title">QUOTATION</span>
    </div>

    {{-- Info Section --}}
    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="width: 58%; vertical-align: top; padding: 0;">
                <table class="info-table">
                    <tr>
                        <td class="label-col">To:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><span class="to-company">{{ strtoupper($quotation->customer->company_name ?? $quotation->customer->name) }}</span></td>
                    </tr>
                    @if($quotation->customer->address)
                    <tr>
                        <td></td>
                        <td>{{ $quotation->customer->address }}</td>
                    </tr>
                    @endif
                    @if($quotation->customer->tax_id)
                    <tr>
                        <td class="label-col">Tax ID:</td>
                        <td>{{ $quotation->customer->tax_id }}</td>
                    </tr>
                    @endif
                    <tr><td colspan="2" style="height: 10px;"></td></tr>
                    <tr>
                        <td class="label-col">Attn:</td>
                        <td>{{ $quotation->customer->name }}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Tel:</td>
                        <td>{{ $quotation->customer->phone ?? '' }}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Email:</td>
                        <td>{{ $quotation->customer->email ?? '' }}</td>
                    </tr>
                </table>
            </td>
            <td style="width: 42%; vertical-align: top; padding: 0;">
                <table class="info-table">
                    <tr>
                        <td class="right-label">No.:</td>
                        <td><span class="doc-no">{{ $quotation->quotation_number }}</span></td>
                    </tr>
                    @if($quotation->show_date_on_pdf)
                    <tr>
                        <td class="right-label">Date:</td>
                        <td>{{ $quotation->created_at->format('d/m/Y') }}</td>
                    </tr>
                    @endif
                    @if($quotation->valid_until)
                    <tr>
                        <td class="right-label">Valid Until:</td>
                        <td>{{ \Carbon\Carbon::parse($quotation->valid_until)->format('d/m/Y') }}</td>
                    </tr>
                    @endif
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
            @foreach($quotation->items as $index => $item)
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

            @for($i = count($quotation->items); $i < 8; $i++)
                <tr class="spacer-row"><td colspan="6">&nbsp;</td></tr>
            @endfor

            <tr class="summary-row">
                <td colspan="5" class="text-right" style="padding-right: 15px;">Subtotal (RM)</td>
                <td class="text-right">{{ number_format($quotation->subtotal, 2) }}</td>
            </tr>

            @if($quotation->tax_amount > 0)
            <tr class="summary-row">
                <td colspan="5" class="text-right" style="padding-right: 15px;">Tax (RM)</td>
                <td class="text-right">{{ number_format($quotation->tax_amount, 2) }}</td>
            </tr>
            @endif

            <tr class="total-row">
                <td colspan="5" class="text-right" style="padding-right: 15px;"><strong>TOTAL AMOUNT (RM)</strong></td>
                <td class="text-right"><strong>{{ number_format($quotation->total_amount, 2) }}</strong></td>
            </tr>
        </tbody>
    </table>

    @if($quotation->notes)
        <div class="notes-section">
            <strong>Notes:</strong> {{ $quotation->notes }}
        </div>
    @endif

    @if($quotation->valid_until)
        <div class="validity-section">
            <strong>This quotation is valid until {{ \Carbon\Carbon::parse($quotation->valid_until)->format('d M Y') }}.</strong>
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
        <p>Thank you for your consideration!</p>
        @if($quotation->show_date_on_pdf)
            <p>Generated on {{ now()->format('d M Y H:i') }}</p>
        @endif
    </div>

</body>

</html>
