@extends('layouts.app')

@section('content')
  <h1 class="text-xl font-bold mb-4">Table Management</h1>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    @forelse($tables as $t)
      <div class="bg-white border rounded p-4">
        <div class="flex items-center justify-between mb-2">
          <div class="text-2xl font-bold">{{ $t->code }}</div>
          <span class="text-xs px-2 py-1 rounded-full {{ $t->status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">{{ ucfirst($t->status) }}</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <a href="{{ route('pos',['table'=>$t->code]) }}" class="bg-indigo-600 text-white rounded p-2 text-center">New Order</a>
          <button class="bg-blue-100 text-blue-800 rounded p-2">Bill</button>
          <button class="bg-red-100 text-red-800 rounded p-2">Occupy</button>
          <button class="bg-green-100 text-green-800 rounded p-2">Free</button>
        </div>
      </div>
    @empty
      <div class="col-span-6 text-sm text-slate-500">No tables yet.</div>
    @endforelse
  </div>
@endsection
