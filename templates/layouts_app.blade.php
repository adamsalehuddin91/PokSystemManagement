<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>SwiftPOS</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  </head>
  <body class="min-h-screen bg-slate-50 text-slate-900">
    <nav class="bg-indigo-600 text-white">
      <div class="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6">
        <a href="{{ route('dashboard') }}" class="font-semibold">SwiftPOS</a>
        <a href="{{ route('customer') }}" class="hover:underline">Customer</a>
        <a href="{{ route('pos') }}" class="hover:underline">POS</a>
        <a href="{{ route('tables') }}" class="hover:underline">Tables</a>
        <a href="{{ route('kitchen') }}" class="hover:underline">Kitchen</a>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto p-6">
      @yield('content')
    </main>
  </body>
  </html>

