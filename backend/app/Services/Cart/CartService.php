<?php

namespace App\Services\Cart;

use App\Repositories\Cart\CartRepository;

class CartService
{
    public function __construct(private CartRepository $cartRepository)
    {
    }

    public function index(string $userId)
    {
        $result = $this->cartRepository->index($userId);
        return $result;
    }

    public function store(array $data)
    {
        return $this->cartRepository->store($data);
    }
}
