<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use App\Http\Resources\Cart\CartResource;
use App\Services\Cart\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function __construct(private CartService $cartService)
    {
    }

    public function index()
    {
        $result = $this->cartService->index();
        return CartResource::collection($result);
    }

    public function store(Request $request)
    {
        $userId = Auth::id();
        Log::info($userId);
        $data = [
            'user_id' => $userId,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
        ];

        $result = $this->cartService->store($data);
        return response()->json($result);
    }

    public function destory()
    {

    }
}
