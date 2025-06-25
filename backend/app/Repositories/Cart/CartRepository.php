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
}
