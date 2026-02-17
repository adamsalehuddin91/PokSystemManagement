<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.qty' => 'required|integer|min:1',
            'items.*.price_cents' => 'required|integer|min:0',
            'dining_table_id' => 'nullable|exists:dining_tables,id',
            'status' => 'nullable|in:pending,preparing,ready,completed',
            'payment_method' => 'nullable|in:cash,qr,card',
            'payment_amount' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Calculate total
            $totalCents = collect($request->items)->sum(function ($item) {
                return $item['price_cents'] * $item['qty'];
            });

            // Create order
            $order = Order::create([
                'dining_table_id' => $request->dining_table_id,
                'status' => $request->status ?? 'pending',
                'total_cents' => $totalCents,
            ]);

            // Create order items
            foreach ($request->items as $item) {
                $menuItem = MenuItem::find($item['menu_item_id']);

                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_item_id' => $item['menu_item_id'],
                    'menu_item_name' => $menuItem->name,
                    'qty' => $item['qty'],
                    'price_cents' => $item['price_cents'],
                ]);
            }

            // Load relationships for response
            $order->load(['items', 'table']);

            DB::commit();

            // TODO: Broadcast OrderCreated event for real-time updates
            // event(new OrderCreated($order));

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,preparing,ready,completed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $order = Order::with(['items', 'table'])->findOrFail($id);
            $order->status = $request->status;
            $order->save();

            // TODO: Broadcast OrderUpdated event
            // event(new OrderUpdated($order));

            return response()->json([
                'message' => 'Order status updated',
                'order' => $order
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function kitchenOrders()
    {
        $orders = Order::with(['table', 'items'])
            ->whereIn('status', ['pending', 'preparing', 'ready'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'orders' => $orders
        ]);
    }
}
