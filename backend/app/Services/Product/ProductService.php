<?php

namespace App\Services\Product;

use App\Repositories\Product\ProductRepository;

class ProductService
{
    public function __construct(private ProductRepository $productRepository)
    {
    }

    public function index()
    {
        $result = $this->productRepository->index();
        return $result;
    }
}
