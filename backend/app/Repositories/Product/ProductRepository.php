<?php

namespace App\Repositories\Product;

use App\Models\Product;

class ProductRepository
{
    public function __construct()
    {
    }

    public function index()
    {
        $product = Product::paginate(6);
        return $product;
    }
}
