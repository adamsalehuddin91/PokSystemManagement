<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Delivery Order - {{ $deliveryOrder->do_number }}</title>
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

        /* Company Header */
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

        /* Document Title */
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

        /* Info Section */
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
            font-weight: normal;
        }

        .info-table .value-col {
            /* takes remaining space */
        }

        .info-table .right-label {
            width: 45px;
            text-align: left;
        }

        .info-table .right-value {
            text-align: left;
        }

        .to-company {
            font-weight: bold;
            font-size: 12px;
        }

        .doc-no {
            font-weight: bold;
            font-size: 13px;
        }

        /* Items Table */
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
        .text-left { text-align: left; }

        .desc-sub {
            font-size: 10px;
            color: #333;
            padding-left: 5px;
        }

        /* Acknowledgement */
        .acknowledgement {
            margin-top: 30px;
            font-size: 11px;
            line-height: 1.6;
        }

        /* Signature Section */
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
        <span class="doc-title">DELIVERY ORDER</span>
    </div>

    {{-- Info Section: Two-column using nested tables --}}
    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="width: 58%; vertical-align: top; padding: 0;">
                <table class="info-table">
                    <tr>
                        <td class="label-col">To:</td>
                        <td class="value-col"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="value-col">
                            <span class="to-company">
                                @if($deliveryOrder->customer)
                                    {{ strtoupper($deliveryOrder->customer->company_name ?? $deliveryOrder->customer->name) }}
                                @endif
                            </span>
                        </td>
                    </tr>
                    @if($deliveryOrder->customer && $deliveryOrder->customer->address)
                    <tr>
                        <td></td>
                        <td class="value-col">{{ $deliveryOrder->customer->address }}</td>
                    </tr>
                    @endif
                    <tr><td colspan="2" style="height: 10px;"></td></tr>
                    <tr>
                        <td class="label-col">Attn:</td>
                        <td class="value-col">
                            @if($deliveryOrder->customer)
                                {{ $deliveryOrder->customer->name }}
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td class="label-col">Tel:</td>
                        <td class="value-col">{{ $deliveryOrder->customer->phone ?? '' }}</td>
                    </tr>
                    <tr>
                        <td class="label-col">Email:</td>
                        <td class="value-col">{{ $deliveryOrder->customer->email ?? '' }}</td>
                    </tr>
                </table>
            </td>
            <td style="width: 42%; vertical-align: top; padding: 0;">
                <table class="info-table">
                    <tr>
                        <td class="right-label">No.:</td>
                        <td class="right-value"><span class="doc-no">DO - {{ $deliveryOrder->do_number }}</span></td>
                    </tr>
                    <tr>
                        <td class="right-label">Date:</td>
                        <td class="right-value">{{ \Carbon\Carbon::parse($deliveryOrder->delivery_date)->format('d/m/Y') }}</td>
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
                <th style="width: 54%;">Description</th>
                <th style="width: 10%;">Qty</th>
                <th style="width: 10%;">Unit</th>
                <th style="width: 20%;">Remark</th>
            </tr>
        </thead>
        <tbody>
            @php $totalQty = 0; @endphp
            @foreach($deliveryOrder->items as $index => $item)
                <tr class="item-row">
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td>
                        <strong>{{ strtoupper($item->sku->name) }}</strong>
                        @if($item->sku->description)
                            <br><span class="desc-sub">{{ $item->sku->description }}</span>
                        @endif
                    </td>
                    <td class="text-center">{{ $item->quantity }}</td>
                    <td class="text-center">UNIT</td>
                    <td></td>
                </tr>
                <tr class="spacer-row"><td colspan="5"></td></tr>
                @php $totalQty += $item->quantity; @endphp
            @endforeach

            {{-- Empty rows to fill space --}}
            @for($i = count($deliveryOrder->items); $i < 10; $i++)
                <tr class="spacer-row"><td colspan="5">&nbsp;</td></tr>
            @endfor

            {{-- Total Qty --}}
            <tr class="total-row">
                <td colspan="2" class="text-right" style="padding-right: 15px;"><strong>Total Qty</strong></td>
                <td class="text-center"><strong>{{ $totalQty }}</strong></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>

    {{-- Acknowledgement --}}
    <div class="acknowledgement">
        <p>We have received above-mentioned items in</p>
        <p>good condition and order</p>
    </div>

    {{-- Signature Section --}}
    <table class="sig-table">
        <tr>
            <td class="sig-space"></td>
            <td class="sig-space" style="text-align: right;">RECEIVED BY :</td>
        </tr>
        <tr>
            <td>
                <div class="sig-line">Signature & Company stamp</div>
                <div class="sig-company">{{ config('company.name') }} ( {{ config('company.reg_no') }} )</div>
            </td>
            <td>
                <div class="sig-line">Authorised Signature</div>
                <div class="sig-company">( COMPANY COP & SIGNATURE )</div>
            </td>
        </tr>
    </table>

</body>

</html>
