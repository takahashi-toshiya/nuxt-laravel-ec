export default defineI18nLocale(async () => ({
  // nameはテキストを表示する際に引数を渡すことができる部分
  common: {
    loading: "読み込み中",
    processing: "処理中",
    submitting: "送信中",
  },
  product: {
    login_required: "カートへの追加はログイン後に利用できます。",
    add_to_cart: "カートに追加",
    loading: "商品を読み込み中...",
  },
  user: {
    title: "{name}様",
  },
  cart: {
    title: "{name}様のカートの中身",
    loading: "カート情報を読み込み中...",
  },
  auth: {
    login_loading: "ログイン中...",
    logout_loading: "ログアウト中...",
  },
  contact: {
    submitting: "送信中...",
    submit_success: "送信完了",
  },
}));
