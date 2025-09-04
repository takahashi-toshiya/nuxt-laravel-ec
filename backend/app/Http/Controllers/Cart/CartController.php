<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use App\Http\Resources\Cart\CartResource;
use App\Services\Cart\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function __construct(private CartService $cartService)
    {
    }

    public function index()
    {
        $userId = Auth::id();
        $result = $this->cartService->index($userId);
        return CartResource::collection($result);
    }

    public function store(Request $request)
    {
        $userId = Auth::id();
        $data = [
            'user_id' => $userId,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
        ];

        $result = $this->cartService->store($data);
        return response()->json($result);
    }

    public function update(Request $request, int $productId)
    {
        $userId = Auth::id();
        $quantity = $request->quantity;
        
        $result = $this->cartService->update($userId, $productId, $quantity);
        return response()->json($result);
    }

    public function destroy(int $productId)
    {
        $userId = Auth::id();
        $result = $this->cartService->destroy($userId, $productId);
        return response()->json($result);
    }
}
