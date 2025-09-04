<?php

namespace App\Repositories\Cart;

use App\Models\Cart;

class CartRepository
{
    public function index(string $userId)
    {
        $result = Cart::with('product')->where('user_id', $userId)->get();
        return $result;
    }

    public function store(array $data)
    {
        return Cart::create($data);
    }

    public function update(string $userId, int $productId, int $quantity)
    {
        return Cart::where('user_id', $userId)
            ->where('product_id', $productId)
            ->update(['quantity' => $quantity]);
    }

    public function destroy(string $userId, int $productId)
    {
        return Cart::where('user_id', $userId)
            ->where('product_id', $productId)
            ->delete();
    }
}
