@extends('layouts.app')

@section('content')
  <h1 class="text-2xl font-bold mb-4">Welcome to SwiftPOS</h1>

  <div class="grid md:grid-cols-3 gap-4">
    <a class="p-6 bg-blue-600 text-white rounded-lg" href="{{ route('pos') }}">Point of Sale</a>
    <a class="p-6 bg-green-600 text-white rounded-lg" href="{{ route('tables') }}">Table Management</a>
    <a class="p-6 bg-amber-600 text-white rounded-lg" href="{{ route('kitchen') }}">Kitchen Display</a>
  </div>
@endsection

