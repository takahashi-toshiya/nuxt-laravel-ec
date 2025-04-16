<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductPaginateResource;
use App\Services\Product\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(private ProductService  $productService)
    {
    }

    public function index()
    {
        $result = $this->productService->index();
        return new ProductPaginateResource($result);
    }
}
