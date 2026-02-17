@extends('layouts.app')

@section('content')
<div x-data="customerOrder()" class="max-w-4xl mx-auto">
  <h1 class="text-2xl font-bold mb-4">Order Menu</h1>

  <!-- Search -->
  <input
    x-model="search"
    type="text"
    placeholder="Search menu..."
    class="w-full border rounded-lg p-3 mb-4"
  />

  <!-- Category Filter -->
  <div class="flex gap-2 mb-4 overflow-x-auto">
    <button
      @click="selectedCategory = 'all'"
      :class="selectedCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-white'"
      class="px-4 py-2 rounded-lg border whitespace-nowrap"
    >All</button>
    <template x-for="cat in categories" :key="cat">
      <button
        @click="selectedCategory = cat"
        :class="selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white'"
        class="px-4 py-2 rounded-lg border whitespace-nowrap"
        x-text="cat"
      ></button>
    </template>
  </div>

  <!-- Menu Grid -->
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
    <template x-for="item in filteredItems" :key="item.id">
      <button
        @click="addToCart(item)"
        class="bg-white border rounded-lg p-4 hover:shadow-lg transition text-left"
      >
        <div class="font-semibold mb-1" x-text="item.name"></div>
        <div class="text-sm text-slate-600" x-text="item.category"></div>
        <div class="text-lg font-bold text-indigo-600 mt-2">
          RM <span x-text="(item.price_cents / 100).toFixed(2)"></span>
        </div>
      </button>
    </template>
  </div>

  <!-- Floating Cart Button -->
  <div
    x-show="cartCount > 0"
    x-transition
    class="fixed bottom-6 right-6 z-50"
  >
    <button
      @click="showCart = !showCart"
      class="bg-indigo-600 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center relative"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
      <span
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
        x-text="cartCount"
      ></span>
    </button>
  </div>

  <!-- Cart Modal -->
  <div
    x-show="showCart"
    x-transition:enter="transition ease-out duration-200"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in duration-150"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0"
    class="fixed inset-0 bg-black bg-opacity-50 z-50"
    @click="showCart = false"
  >
    <div
      @click.stop
      class="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto"
      x-transition:enter="transition ease-out duration-200"
      x-transition:enter-start="translate-x-full"
      x-transition:enter-end="translate-x-0"
      x-transition:leave="transition ease-in duration-150"
      x-transition:leave-start="translate-x-0"
      x-transition:leave-end="translate-x-full"
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Your Order</h2>
        <button @click="showCart = false" class="text-slate-400 hover:text-slate-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Cart Items -->
      <div class="space-y-4 mb-6">
        <template x-for="(item, index) in cart" :key="index">
          <div class="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
            <div class="flex-1">
              <div class="font-medium" x-text="item.name"></div>
              <div class="text-sm text-slate-600">
                RM <span x-text="(item.price_cents / 100).toFixed(2)"></span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="updateQuantity(index, -1)"
                class="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300"
              >-</button>
              <span class="w-8 text-center font-semibold" x-text="item.qty"></span>
              <button
                @click="updateQuantity(index, 1)"
                class="w-8 h-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
              >+</button>
            </div>
          </div>
        </template>
      </div>

      <!-- Total -->
      <div class="border-t pt-4 mb-6">
        <div class="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span class="text-indigo-600">RM <span x-text="total.toFixed(2)"></span></span>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-3">
        <button
          @click="submitOrder"
          :disabled="submitting"
          class="w-full bg-indigo-600 text-white rounded-lg p-3 font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          <span x-show="!submitting">Place Order</span>
          <span x-show="submitting">Submitting...</span>
        </button>
        <button
          @click="clearCart"
          class="w-full bg-slate-100 text-slate-700 rounded-lg p-3 font-semibold hover:bg-slate-200"
        >Clear Cart</button>
      </div>

      <!-- Order Success -->
      <div
        x-show="orderSuccess"
        class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
      >
        <div class="flex items-center gap-2 text-green-800">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <span class="font-semibold">Order placed successfully!</span>
        </div>
        <div class="text-sm text-green-700 mt-2">
          Order #<span x-text="orderNumber"></span> - Please proceed to cashier
        </div>
      </div>
    </div>
  </div>
</div>

<script>
function customerOrder() {
  return {
    items: @json($items),
    cart: [],
    search: '',
    selectedCategory: 'all',
    showCart: false,
    submitting: false,
    orderSuccess: false,
    orderNumber: null,

    get categories() {
      return [...new Set(this.items.map(i => i.category))];
    },

    get filteredItems() {
      return this.items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(this.search.toLowerCase());
        const matchesCategory = this.selectedCategory === 'all' || item.category === this.selectedCategory;
        return matchesSearch && matchesCategory && item.active;
      });
    },

    get cartCount() {
      return this.cart.reduce((sum, item) => sum + item.qty, 0);
    },

    get total() {
      return this.cart.reduce((sum, item) => sum + (item.price_cents * item.qty), 0) / 100;
    },

    addToCart(item) {
      const existing = this.cart.find(c => c.id === item.id);
      if (existing) {
        existing.qty++;
      } else {
        this.cart.push({ ...item, qty: 1 });
      }
      this.showCart = true;
    },

    updateQuantity(index, delta) {
      this.cart[index].qty += delta;
      if (this.cart[index].qty <= 0) {
        this.cart.splice(index, 1);
      }
    },

    clearCart() {
      if (confirm('Clear all items from cart?')) {
        this.cart = [];
        this.showCart = false;
      }
    },

    async submitOrder() {
      this.submitting = true;
      this.orderSuccess = false;

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
            source: 'customer'
          })
        });

        const data = await response.json();

        if (response.ok) {
          this.orderNumber = data.order.id;
          this.orderSuccess = true;
          this.cart = [];

          setTimeout(() => {
            this.showCart = false;
            this.orderSuccess = false;
          }, 3000);
        } else {
          alert('Failed to place order: ' + (data.message || 'Unknown error'));
        }
      } catch (error) {
        alert('Error placing order: ' + error.message);
      } finally {
        this.submitting = false;
      }
    }
  }
}
</script>
@endsection
