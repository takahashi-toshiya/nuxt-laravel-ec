# 設計パターン学習用プロジェクト - EC サイト

このプロジェクトは、モダンな Web アプリケーション開発における**設計パターンの学習**を目的とした教育用 EC サイトです。  
フロントエンドとバックエンドの責務分離、レイヤードアーキテクチャの実践に重点を置いています。
そのため細かい UI 調整や一部機能の実装は優先していません。本プロジェクトの目的は、設計パターンの適用と責務分離の実践であり、実用性よりも構造面の学習を重視しています。

## 🎯 学習目的

### 課題背景

過去に関わったフロントエンド・バックエンド両方のプロジェクトで、責務分離が不十分なためにメソッドやコントローラーが肥大化し、保守性や可読性の低下を経験しました。本プロジェクトでは、それらの課題を解消するために、クリーンアーキテクチャ、リポジトリ層/サービス層などの設計パターンを実際に適用し、その効果を検証しました。

### 学習テーマ

- **フロントエンド**: Vue/Nuxt による クリーンアーキテクチャ の実践
- **バックエンド**: Laravel による リポジトリ層/サービス層 の実装
- **テスト自動化**: 未経験領域への挑戦（コンポーネント・ストア・E2E テスト）
- **AI 駆動開発**: Claude Code を活用した効率的な開発体験
- **全体**: API 設計、状態管理、テスト駆動開発の体験

## 🏗️ アーキテクチャ概要

### フロントエンド (Nuxt.js 3 + TypeScript)

```
pages/          → ルーティング・画面表示
components/     → UI コンポーネント (レイヤー分離)
usecases/       → アプリケーション固有ビジネスロジック
services/       → ビジネスロジック・API呼び出し調整
api/           → HTTP通信層 (APIクライアント)
store/         → 状態管理 (Pinia)
types/         → TypeScript型定義
```

**採用設計パターン:**

- Clean Architecture (レイヤー間依存制御)
- Composition API + Composables (ロジック再利用)
- VeeValidate + Zod (バリデーション)

### バックエンド (Laravel 11 + PHP 8.2)

```
Controllers/    → HTTPリクエスト処理・レスポンス制御
Services/      → ビジネスロジック層
Repositories/  → データアクセス層 (Eloquent抽象化)
Models/        → データモデル (Eloquent ORM)
Resources/     → APIレスポンス整形
```

**採用設計パターン:**

- Repository Pattern (データ層抽象化)
- Service Layer Pattern (ビジネスロジック分離)
- Laravel Sanctum (SPA 認証)

## ⚡ 実装済み機能

### 基本 EC フロー

- ✅ **商品一覧表示** (ページネーション付き)
- ✅ **ユーザー認証** (新規登録・ログイン・ログアウト)
- ✅ **カート機能** (追加・数量変更・削除)
- ✅ **レスポンシブデザイン** (TailwindCSS)

### 技術的実装

- ✅ **API エンドポイント** (RESTful 設計)
- ✅ **状態管理** (Pinia ストア)
- ✅ **フォームバリデーション** (VeeValidate + Zod)
- ✅ **エラーハンドリング** (モーダル・通知)
- ✅ **ローディング管理** (UX 向上)

### テスト環境

- ✅ **コンポーネントテスト** (Vue Test Utils + Vitest)
- ✅ **ストアテスト** (Pinia 状態管理テスト)
- ✅ **E2E テスト環境** (Playwright 設定済み)

## 🚀 開発環境

Docker Compose で完結する開発環境:

```bash
# 全サービス起動
docker-compose up -d

# 個別開発
cd frontend && npm run dev    # http://localhost:3000
cd backend && composer run dev # http://localhost:8000
```

**サービス構成:**

- **Frontend**: Nuxt.js (3000)
- **Backend**: Laravel (8000)
- **Database**: MySQL 8.0 (3306)
- **Proxy**: Nginx (80)

## 📁 主要ファイル構成

```
nuxt-laravel-ec/
├── frontend/
│   ├── pages/           # ページコンポーネント
│   ├── components/      # 再利用コンポーネント
│   ├── usecases/       # ユースケース層
│   ├── services/       # サービス層
│   ├── store/          # Pinia ストア
│   └── tests/          # テストファイル
├── backend/
│   ├── app/Http/Controllers/  # API コントローラー
│   ├── app/Services/         # ビジネスロジック
│   ├── app/Repositories/     # データアクセス
│   └── routes/api.php        # APIルート定義
└── docker-compose.yml
```

## 🛣️ API エンドポイント

```
POST /api/login           # ログイン
POST /api/signup          # 新規登録
GET  /api/products        # 商品一覧

[認証必須]
GET  /api/user           # ユーザー情報
GET  /api/cart           # カート取得
POST /api/cart           # カート追加
PUT  /api/cart/{id}      # 数量更新
DELETE /api/cart/{id}    # アイテム削除
```

## 🎓 学習ポイント

### フロントエンド

1. **レイヤー分離**: usecase → service → api の依存関係
2. **状態管理**: Pinia によるリアクティブな状態制御
3. **コンポーネント設計**: 責務分離と再利用性
4. **型安全**: TypeScript による堅牢性確保

### バックエンド

1. **Repository Pattern**: データ層の抽象化
2. **Service Layer**: ビジネスロジックの分離
3. **API Resource**: レスポンス整形の統一
4. **認証設計**: Laravel Sanctum による SPA 認証

## 🚧 制限事項・改善予定

### 現在の制限

- 決済機能は未実装（モーダル表示のみ）
- 商品検索・フィルタリング機能なし
- 管理画面未実装
- メール通知機能なし

### 今後の学習要素

- [ ] **決済フロー** (Stripe 連携など)
- [ ] **商品管理** (CRUD 操作・画像アップロード)
- [ ] **注文履歴** (購入完了フロー)
- [ ] **リアルタイム通知** (WebSocket)
- [ ] **パフォーマンス最適化** (キャッシュ戦略)
- [ ] **セキュリティ強化** (CSRF・XSS 対策)

## 🧪 テスト実行

```bash
# フロントエンドテスト
cd frontend
npm run test        # 単体テスト
npm run test:e2e    # E2Eテスト

# バックエンドテスト
cd backend
php artisan test    # Laravel テスト
```

## 📚 参考資料

- **Clean Architecture**: Robert C. Martin
- **Repository Pattern**: Laravel 公式ドキュメント
- **Vue Composition API**: Vue.js 公式ガイド
- **TypeScript**: 型安全な開発手法

## 🤖 AI 駆動開発での学習体験

### Claude Code 活用による開発効率化

このプロジェクトでは **Claude Code** を積極活用し、従来の手動開発とは異なるアプローチを実践しました。

**Claude Code で体験した内容:**

- **設計パターンの迅速な実装**: Repository・Service・Usecase 層の自動生成
- **テストコードの網羅的作成**: コンポーネント・ストア・統合テストの体系的実装
- **エラー対応の効率化**: デバッグ・修正・検証の高速化
- **ドキュメント生成**: アーキテクチャ図・API 仕様・README の自動整備

### テスト自動化への挑戦

**従来の経験不足領域:**

- フロントエンドのコンポーネントテスト設計
- 状態管理（Pinia）のテスト戦略
- E2E テストシナリオの構築
- テストデータ・モック設計

**Claude Code による学習加速:**

- テストケース設計のベストプラクティス習得
- Vue Test Utils + Vitest の効率的な活用方法
- テスト可能な設計への自然なリファクタリング

### 得られた新しい観点

#### 🔍 **設計品質の向上**

- AI による客観的なコードレビュー効果
- 複数の実装パターン比較・選択の高速化
- 人間が見落としがちな設計不備の早期発見

#### ⚡ **開発スピードと学習効率**

- 調べる時間を実装・検証時間に転換
- エラー修正の試行錯誤時間を大幅短縮
- 新技術キャッチアップの効率化

#### 🧪 **テスト品質への意識変化**

- テストファーストな思考への転換
- 網羅性・保守性を考慮したテスト設計
- テスト可能な設計の重要性認識

---

このプロジェクトは実用性よりも **設計の理解と実践** に重点を置いています。  
特に **過去の開発経験での課題解決** と **AI を活用した効率的な学習方法** の体験が主目的です。
