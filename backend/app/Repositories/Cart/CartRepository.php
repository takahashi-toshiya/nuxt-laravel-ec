<?php

namespace App\Repositories\Cart;

use App\Models\Cart;

class CartRepository
{
    public function index()
    {
        $result = Cart::all();
        return $result;
    }

    public function store(array $data)
    {
        return Cart::create($data);
    }
}
