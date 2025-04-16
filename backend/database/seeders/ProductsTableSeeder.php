<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        $items = [
            [
                'name' => 'マカロン',
                'price' => 1000,
                'stock' => 1,
                'comment' => 'マカロンです',
                'image_path' => '/image/fx_2.jpg',
            ],
            [
                'name' => 'ヘッドフォン',
                'price' => 2000,
                'stock' => 2,
                'comment' => 'ヘッドフォンです',
                'image_path' => '/image/fx_2.jpg',
            ],
            [
                'name' => '時計',
                'price' => 3000,
                'stock' => 3,
                'comment' => '時計です',
                'image_path' => '/image/fx_2.jpg',
            ],
            [
                'name' => 'ドーナッツ',
                'price' => 4000,
                'stock' => 4,
                'comment' => 'ドーナッツです',
                'image_path' => '/image/fx_2.jpg',
            ],
            [
                'name' => '腕時計',
                'price' => 5000,
                'stock' => 5,
                'comment' => '腕時計です',
                'image_path' => '/image/fx_2.jpg',
            ],
            [
                'name' => 'カメラレンズ',
                'price' => 6000,
                'stock' => 6,
                'comment' => 'カメラレンズです',
                'image_path' => '/image/fx_2.jpg',
            ],
        ];

        DB::table('products')->insert($items);
    }
}
