@extends('layouts.app')

@section('content')
<div x-data="kitchenDisplay()" x-init="init()">
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-xl font-bold">Kitchen Display System</h1>
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2">
        <div
          :class="connected ? 'bg-green-500' : 'bg-red-500'"
          class="w-2 h-2 rounded-full animate-pulse"
        ></div>
        <span class="text-sm" x-text="connected ? 'Live' : 'Offline'"></span>
      </div>
      <button
        @click="refreshOrders"
        class="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm"
      >
        <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      </button>
    </div>
  </div>

  <div class="grid md:grid-cols-3 gap-4">
    <!-- Pending Orders -->
    <div class="border-2 rounded-lg p-4 bg-amber-50 border-amber-300">
      <div class="flex justify-between items-center mb-4">
        <div class="px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-semibold text-sm">
          Pending (<span x-text="pendingOrders.length"></span>)
        </div>
      </div>

      <div class="space-y-3 min-h-[300px]">
        <template x-for="order in pendingOrders" :key="order.id">
          <div class="bg-white rounded-lg p-3 border-2 border-amber-400 shadow">
            <div class="flex justify-between items-start mb-2">
              <div>
                <div class="font-bold text-lg">Order #<span x-text="order.id"></span></div>
                <div class="text-sm text-slate-600">
                  <span x-text="order.table ? 'Table ' + order.table.code : 'Counter'"></span>
                  <span class="mx-1">•</span>
                  <span x-text="totalItems(order)"></span> items
                </div>
                <div class="text-xs text-slate-500" x-text="timeAgo(order.created_at)"></div>
              </div>
            </div>

            <div class="space-y-1 mb-3 max-h-32 overflow-y-auto">
              <template x-for="item in order.items" :key="item.id">
                <div class="flex justify-between text-sm bg-slate-50 p-2 rounded">
                  <span><strong x-text="item.qty + 'x'"></strong> <span x-text="item.menu_item_name"></span></span>
                </div>
              </template>
            </div>

            <button
              @click="updateStatus(order.id, 'preparing')"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded py-2 font-medium"
            >Start Preparing</button>
          </div>
        </template>

        <div x-show="pendingOrders.length === 0" class="text-center text-slate-500 py-8">
          No pending orders
        </div>
      </div>
    </div>

    <!-- Preparing Orders -->
    <div class="border-2 rounded-lg p-4 bg-indigo-50 border-indigo-300">
      <div class="flex justify-between items-center mb-4">
        <div class="px-3 py-1 rounded-full bg-indigo-200 text-indigo-900 font-semibold text-sm">
          Preparing (<span x-text="preparingOrders.length"></span>)
        </div>
      </div>

      <div class="space-y-3 min-h-[300px]">
        <template x-for="order in preparingOrders" :key="order.id">
          <div class="bg-white rounded-lg p-3 border-2 border-indigo-400 shadow">
            <div class="flex justify-between items-start mb-2">
              <div>
                <div class="font-bold text-lg">Order #<span x-text="order.id"></span></div>
                <div class="text-sm text-slate-600">
                  <span x-text="order.table ? 'Table ' + order.table.code : 'Counter'"></span>
                  <span class="mx-1">•</span>
                  <span x-text="totalItems(order)"></span> items
                </div>
                <div class="text-xs text-slate-500" x-text="timeAgo(order.created_at)"></div>
              </div>
            </div>

            <div class="space-y-1 mb-3 max-h-32 overflow-y-auto">
              <template x-for="item in order.items" :key="item.id">
                <div class="flex justify-between text-sm bg-slate-50 p-2 rounded">
                  <span><strong x-text="item.qty + 'x'"></strong> <span x-text="item.menu_item_name"></span></span>
                </div>
              </template>
            </div>

            <button
              @click="updateStatus(order.id, 'ready')"
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded py-2 font-medium"
            >Mark Ready</button>
          </div>
        </template>

        <div x-show="preparingOrders.length === 0" class="text-center text-slate-500 py-8">
          No orders in preparation
        </div>
      </div>
    </div>

    <!-- Ready Orders -->
    <div class="border-2 rounded-lg p-4 bg-emerald-50 border-emerald-300">
      <div class="flex justify-between items-center mb-4">
        <div class="px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 font-semibold text-sm">
          Ready (<span x-text="readyOrders.length"></span>)
        </div>
      </div>

      <div class="space-y-3 min-h-[300px]">
        <template x-for="order in readyOrders" :key="order.id">
          <div class="bg-white rounded-lg p-3 border-2 border-emerald-400 shadow">
            <div class="flex justify-between items-start mb-2">
              <div>
                <div class="font-bold text-lg">Order #<span x-text="order.id"></span></div>
                <div class="text-sm text-slate-600">
                  <span x-text="order.table ? 'Table ' + order.table.code : 'Counter'"></span>
                  <span class="mx-1">•</span>
                  <span x-text="totalItems(order)"></span> items
                </div>
                <div class="text-xs text-slate-500" x-text="timeAgo(order.created_at)"></div>
              </div>
            </div>

            <div class="space-y-1 mb-3 max-h-32 overflow-y-auto">
              <template x-for="item in order.items" :key="item.id">
                <div class="flex justify-between text-sm bg-slate-50 p-2 rounded">
                  <span><strong x-text="item.qty + 'x'"></strong> <span x-text="item.menu_item_name"></span></span>
                </div>
              </template>
            </div>

            <button
              @click="updateStatus(order.id, 'completed')"
              class="w-full bg-slate-900 hover:bg-slate-800 text-white rounded py-2 font-medium"
            >Complete & Serve</button>
          </div>
        </template>

        <div x-show="readyOrders.length === 0" class="text-center text-slate-500 py-8">
          No ready orders
        </div>
      </div>
    </div>
  </div>
</div>

<script>
function kitchenDisplay() {
  return {
    orders: @json($orders),
    connected: false,
    echo: null,

    init() {
      this.setupRealtime();
      this.refreshOrders();
    },

    setupRealtime() {
      // Try to connect to Pusher/Echo if available
      if (typeof Echo !== 'undefined') {
        this.echo = Echo.channel('orders')
          .listen('OrderCreated', (e) => {
            this.playNotificationSound();
            this.refreshOrders();
          })
          .listen('OrderUpdated', (e) => {
            this.refreshOrders();
          });
        this.connected = true;
      } else {
        // Fallback to polling every 10 seconds
        setInterval(() => {
          this.refreshOrders();
        }, 10000);
      }
    },

    async refreshOrders() {
      try {
        const response = await fetch('/api/kitchen/orders');
        const data = await response.json();
        if (response.ok) {
          this.orders = data.orders;
        }
      } catch (error) {
        console.error('Failed to refresh orders:', error);
      }
    },

    get pendingOrders() {
      return this.orders.filter(o => o.status === 'pending');
    },

    get preparingOrders() {
      return this.orders.filter(o => o.status === 'preparing');
    },

    get readyOrders() {
      return this.orders.filter(o => o.status === 'ready');
    },

    totalItems(order) {
      return order.items.reduce((sum, item) => sum + item.qty, 0);
    },

    timeAgo(timestamp) {
      const now = new Date();
      const then = new Date(timestamp);
      const seconds = Math.floor((now - then) / 1000);

      if (seconds < 60) return 'Just now';
      if (seconds < 3600) return Math.floor(seconds / 60) + ' min ago';
      return Math.floor(seconds / 3600) + ' hr ago';
    },

    async updateStatus(orderId, newStatus) {
      try {
        const response = await fetch(`/api/orders/${orderId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify({ status: newStatus })
        });

        const data = await response.json();
        if (response.ok) {
          await this.refreshOrders();
          if (newStatus === 'ready') {
            this.playNotificationSound();
          }
        } else {
          alert('Failed to update: ' + (data.message || 'Unknown error'));
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    },

    playNotificationSound() {
      // Simple beep notification
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  }
}
</script>
@endsection
