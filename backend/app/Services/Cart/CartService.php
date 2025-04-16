<?php

namespace App\Services\Cart;

use App\Repositories\Cart\CartRepository;

class CartService
{
    public function __construct(private CartRepository $cartRepository)
    {
    }

    public function index()
    {
        $result = $this->cartRepository->index();
        return $result;
    }

    // DTOを学んでもいいかもしれん
    public function store(array $data)
    {
        return $this->cartRepository->store($data);
    }
}
