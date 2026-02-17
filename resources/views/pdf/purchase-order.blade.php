<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Purchase Order - {{ $po->po_number }}</title>
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
            width: 50px;
        }

        .info-table .right-label {
            width: 55px;
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

        .items-table .total-row td {
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            font-weight: bold;
            padding: 7px 8px;
        }

        .text-center { text-align: center; }
        .text-right { text-align: right; }

        .notes-section {
            margin-top: 15px;
            font-size: 10px;
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
            margin-top: 20px;
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
        <span class="doc-title">PURCHASE ORDER</span>
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
                        <td><span class="to-company">{{ strtoupper($po->supplier->company_name ?? $po->supplier->name) }}</span></td>
                    </tr>
                    @if($po->supplier->address)
                    <tr>
                        <td></td>
                        <td>{{ $po->supplier->address }}</td>
                    </tr>
                    @endif
                    <tr><td colspan="2" style="height: 10px;"></td></tr>
                    <tr>
                        <td class="label-col">Attn:</td>
                        <td>{{ $po->supplier->contact_person ?? $po->supplier->name }}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Tel:</td>
                        <td>{{ $po->supplier->phone ?? '' }}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Email:</td>
                        <td>{{ $po->supplier->email ?? '' }}</td>
                    </tr>
                </table>
            </td>
            <td style="width: 42%; vertical-align: top; padding: 0;">
                <table class="info-table">
                    <tr>
                        <td class="right-label">No.:</td>
                        <td><span class="doc-no">PO - {{ $po->po_number }}</span></td>
                    </tr>
                    <tr>
                        <td class="right-label">Date:</td>
                        <td>{{ $po->created_at->format('d/m/Y') }}</td>
                    </tr>
                    <tr>
                        <td class="right-label">Status:</td>
                        <td><span class="status-badge">{{ strtoupper($po->status) }}</span></td>
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
                <th style="width: 40%;">Description</th>
                <th style="width: 8%;">Qty</th>
                <th style="width: 8%;">Unit</th>
                <th style="width: 19%;">Unit Price (RM)</th>
                <th style="width: 19%;">Total (RM)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($po->items as $index => $item)
                <tr class="item-row">
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td>
                        <strong>{{ strtoupper($item->sku->name) }}</strong>
                        @if($item->sku->description)
                            <br><span style="font-size: 10px; color: #333;">{{ $item->sku->description }}</span>
                        @endif
                    </td>
                    <td class="text-center">{{ $item->quantity }}</td>
                    <td class="text-center">UNIT</td>
                    <td class="text-right">{{ number_format($item->unit_price, 2) }}</td>
                    <td class="text-right">{{ number_format($item->total_price, 2) }}</td>
                </tr>
                <tr class="spacer-row"><td colspan="6"></td></tr>
            @endforeach

            @for($i = count($po->items); $i < 8; $i++)
                <tr class="spacer-row"><td colspan="6">&nbsp;</td></tr>
            @endfor

            <tr class="total-row">
                <td colspan="5" class="text-right" style="padding-right: 15px;"><strong>TOTAL AMOUNT (RM)</strong></td>
                <td class="text-right"><strong>{{ number_format($po->total_amount, 2) }}</strong></td>
            </tr>
        </tbody>
    </table>

    @if($po->notes)
        <div class="notes-section">
            <strong>Notes:</strong> {{ $po->notes }}
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
                <div class="sig-line">Authorised Signature</div>
                @if($po->approver)
                    <div class="sig-company">Approved by: {{ $po->approver->name }}</div>
                @endif
            </td>
        </tr>
    </table>

    <div class="footer">
        <p>Created by: {{ $po->creator->name }} on {{ $po->created_at->format('d M Y H:i') }}</p>
    </div>

</body>

</html>
