@extends('layouts.app')

@section('content')
<div x-data="cashierPOS()" class="grid md:grid-cols-3 gap-6">
  <section class="md:col-span-2">
    <h1 class="text-xl font-bold mb-4">
      POS {{ $table ? "(Table $table)" : "(Counter)" }}
    </h1>

    <!-- Search -->
    <input
      x-model="search"
      type="text"
      placeholder="Search menu…"
      class="w-full border rounded-lg p-3 mb-4"
    />

    <!-- Category Pills -->
    <div class="flex gap-2 mb-4 overflow-x-auto">
      <button
        @click="category = 'all'"
        :class="category === 'all' ? 'bg-indigo-600 text-white' : 'bg-white'"
        class="px-3 py-1 rounded-full border text-sm whitespace-nowrap"
      >All</button>
      <template x-for="cat in categories" :key="cat">
        <button
          @click="category = cat"
          :class="category === cat ? 'bg-indigo-600 text-white' : 'bg-white'"
          class="px-3 py-1 rounded-full border text-sm whitespace-nowrap"
          x-text="cat"
        ></button>
      </template>
    </div>

    <!-- Menu Items -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      <template x-for="item in filteredItems" :key="item.id">
        <button
          @click="addToCart(item)"
          class="bg-white border rounded-lg p-4 hover:shadow-lg transition text-left"
        >
          <div class="font-medium" x-text="item.name"></div>
          <div class="text-sm text-slate-600" x-text="item.category"></div>
          <div class="text-indigo-600 font-semibold mt-1">
            RM <span x-text="(item.price_cents / 100).toFixed(2)"></span>
          </div>
        </button>
      </template>
    </div>
  </section>

  <!-- Cart Sidebar -->
  <aside class="bg-white border rounded-lg p-4 h-fit sticky top-4">
    <div class="flex justify-between items-center mb-4">
      <div>
        <div class="font-semibold text-lg">Order</div>
        @if($table)
          <div class="text-sm text-slate-600">Table: {{ $table }}</div>
        @endif
      </div>
      <button
        @click="clearCart"
        :disabled="cart.length === 0"
        class="text-red-600 text-sm hover:text-red-700 disabled:opacity-30"
      >Clear</button>
    </div>

    <!-- Cart Items -->
    <div class="space-y-2 mb-4 max-h-64 overflow-y-auto">
      <template x-for="(item, index) in cart" :key="index">
        <div class="flex items-center gap-2 bg-slate-50 p-2 rounded">
          <div class="flex-1 min-w-0">
            <div class="font-medium text-sm truncate" x-text="item.name"></div>
            <div class="text-xs text-slate-600">
              RM <span x-text="(item.price_cents / 100).toFixed(2)"></span>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button
              @click="updateQty(index, -1)"
              class="w-6 h-6 rounded bg-slate-200 hover:bg-slate-300 text-sm"
            >-</button>
            <span class="w-8 text-center font-semibold text-sm" x-text="item.qty"></span>
            <button
              @click="updateQty(index, 1)"
              class="w-6 h-6 rounded bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
            >+</button>
          </div>
        </div>
      </template>

      <div x-show="cart.length === 0" class="text-sm text-slate-500 text-center py-4">
        Cart is empty
      </div>
    </div>

    <!-- Total -->
    <div class="border-t pt-3 mb-4">
      <div class="flex justify-between items-center">
        <span class="font-semibold">Subtotal</span>
        <span class="font-bold text-lg">RM <span x-text="subtotal.toFixed(2)"></span></span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-2">
      <button
        @click="sendToKitchen"
        :disabled="cart.length === 0 || processing"
        class="w-full bg-slate-900 text-white rounded-lg p-2 font-medium hover:bg-slate-800 disabled:opacity-50"
      >KOT & Print</button>

      <button
        @click="openPayment('cash')"
        :disabled="cart.length === 0 || processing"
        class="w-full bg-orange-600 text-white rounded-lg p-2 font-medium hover:bg-orange-700 disabled:opacity-50"
      >Cash Payment</button>

      <button
        @click="openPayment('qr')"
        :disabled="cart.length === 0 || processing"
        class="w-full bg-emerald-600 text-white rounded-lg p-2 font-medium hover:bg-emerald-700 disabled:opacity-50"
      >DuitNow QR</button>
    </div>
  </aside>

  <!-- Cash Payment Modal -->
  <div
    x-show="showCashModal"
    x-transition:enter="transition ease-out duration-200"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    @click="showCashModal = false"
  >
    <div
      @click.stop
      class="bg-white rounded-lg p-6 w-full max-w-md"
    >
      <h2 class="text-xl font-bold mb-4">Cash Payment</h2>

      <div class="mb-4">
        <div class="flex justify-between text-lg font-semibold mb-2">
          <span>Total:</span>
          <span class="text-indigo-600">RM <span x-text="subtotal.toFixed(2)"></span></span>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Amount Received</label>
        <input
          x-model.number="cashReceived"
          type="number"
          step="0.01"
          class="w-full border rounded-lg p-3 text-lg"
          placeholder="0.00"
          @input="calculateChange"
        />
      </div>

      <!-- Quick Amount Buttons -->
      <div class="grid grid-cols-4 gap-2 mb-4">
        <template x-for="amount in [10, 20, 50, 100]">
          <button
            @click="cashReceived = amount; calculateChange()"
            class="bg-slate-100 hover:bg-slate-200 rounded p-2 text-sm font-medium"
            x-text="'RM ' + amount"
          ></button>
        </template>
      </div>

      <div
        x-show="change !== null"
        class="mb-4 p-3 rounded-lg"
        :class="change >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'"
      >
        <div class="text-sm font-medium" :class="change >= 0 ? 'text-green-800' : 'text-red-800'">
          <span x-show="change >= 0">Change:</span>
          <span x-show="change < 0">Insufficient:</span>
        </div>
        <div class="text-2xl font-bold" :class="change >= 0 ? 'text-green-600' : 'text-red-600'">
          RM <span x-text="Math.abs(change).toFixed(2)"></span>
        </div>
      </div>

      <div class="flex gap-3">
        <button
          @click="showCashModal = false"
          class="flex-1 bg-slate-100 text-slate-700 rounded-lg p-3 font-medium hover:bg-slate-200"
        >Cancel</button>
        <button
          @click="completeCashPayment"
          :disabled="change === null || change < 0 || processing"
          class="flex-1 bg-orange-600 text-white rounded-lg p-3 font-medium hover:bg-orange-700 disabled:opacity-50"
        >
          <span x-show="!processing">Complete</span>
          <span x-show="processing">Processing...</span>
        </button>
      </div>
    </div>
  </div>

  <!-- QR Payment Modal -->
  <div
    x-show="showQRModal"
    x-transition:enter="transition ease-out duration-200"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    @click="showQRModal = false"
  >
    <div
      @click.stop
      class="bg-white rounded-lg p-6 w-full max-w-md text-center"
    >
      <h2 class="text-xl font-bold mb-4">DuitNow QR Payment</h2>

      <div class="mb-4">
        <div class="text-3xl font-bold text-indigo-600 mb-2">
          RM <span x-text="subtotal.toFixed(2)"></span>
        </div>
      </div>

      <!-- QR Code Placeholder -->
      <div class="bg-slate-100 rounded-lg p-8 mb-4">
        <div class="w-48 h-48 mx-auto bg-white border-4 border-slate-300 rounded-lg flex items-center justify-center">
          <svg class="w-32 h-32 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-2zm-10 8h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3z"/>
          </svg>
        </div>
        <div class="text-sm text-slate-600 mt-3">
          Scan with DuitNow compatible app
        </div>
      </div>

      <div class="flex gap-3">
        <button
          @click="showQRModal = false"
          class="flex-1 bg-slate-100 text-slate-700 rounded-lg p-3 font-medium hover:bg-slate-200"
        >Cancel</button>
        <button
          @click="completeQRPayment"
          :disabled="processing"
          class="flex-1 bg-emerald-600 text-white rounded-lg p-3 font-medium hover:bg-emerald-700 disabled:opacity-50"
        >
          <span x-show="!processing">Confirm Received</span>
          <span x-show="processing">Processing...</span>
        </button>
      </div>
    </div>
  </div>
</div>

<script>
function cashierPOS() {
  return {
    items: @json($items),
    cart: [],
    search: '',
    category: 'all',
    showCashModal: false,
    showQRModal: false,
    cashReceived: null,
    change: null,
    processing: false,

    get categories() {
      return [...new Set(this.items.map(i => i.category))];
    },

    get filteredItems() {
      return this.items.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(this.search.toLowerCase());
        const matchCat = this.category === 'all' || item.category === this.category;
        return matchSearch && matchCat && item.active;
      });
    },

    get subtotal() {
      return this.cart.reduce((sum, item) => sum + (item.price_cents * item.qty), 0) / 100;
    },

    addToCart(item) {
      const existing = this.cart.find(c => c.id === item.id);
      if (existing) {
        existing.qty++;
      } else {
        this.cart.push({ ...item, qty: 1 });
      }
    },

    updateQty(index, delta) {
      this.cart[index].qty += delta;
      if (this.cart[index].qty <= 0) {
        this.cart.splice(index, 1);
      }
    },

    clearCart() {
      if (confirm('Clear all items?')) {
        this.cart = [];
      }
    },

    async sendToKitchen() {
      if (!confirm('Send to kitchen (KOT)?')) return;

      this.processing = true;
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify({
            items: this.cart.map(c => ({
              menu_item_id: c.id,
              qty: c.qty,
              price_cents: c.price_cents
            })),
            dining_table_id: {{ $table ? "'" . $table . "'" : 'null' }},
            status: 'pending',
            source: 'cashier'
          })
        });

        const data = await response.json();
        if (response.ok) {
          alert('Order #' + data.order.id + ' sent to kitchen!');
          this.cart = [];
        } else {
          alert('Failed: ' + (data.message || 'Unknown error'));
        }
      } catch (error) {
        alert('Error: ' + error.message);
      } finally {
        this.processing = false;
      }
    },

    openPayment(type) {
      if (type === 'cash') {
        this.cashReceived = null;
        this.change = null;
        this.showCashModal = true;
      } else {
        this.showQRModal = true;
      }
    },

    calculateChange() {
      if (this.cashReceived !== null && this.cashReceived !== '') {
        this.change = this.cashReceived - this.subtotal;
      } else {
        this.change = null;
      }
    },

    async completeCashPayment() {
      await this.completePayment('cash');
    },

    async completeQRPayment() {
      await this.completePayment('qr');
    },

    async completePayment(method) {
      this.processing = true;
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify({
            items: this.cart.map(c => ({
              menu_item_id: c.id,
              qty: c.qty,
              price_cents: c.price_cents
            })),
            dining_table_id: {{ $table ? "'" . $table . "'" : 'null' }},
            status: 'preparing',
            payment_method: method,
            payment_amount: method === 'cash' ? this.cashReceived * 100 : this.subtotal * 100,
            source: 'cashier'
          })
        });

        const data = await response.json();
        if (response.ok) {
          alert('Order #' + data.order.id + ' completed! Change: RM ' + (this.change || 0).toFixed(2));
          this.cart = [];
          this.showCashModal = false;
          this.showQRModal = false;
        } else {
          alert('Failed: ' + (data.message || 'Unknown error'));
        }
      } catch (error) {
        alert('Error: ' + error.message);
      } finally {
        this.processing = false;
      }
    }
  }
}
</script>
@endsection
