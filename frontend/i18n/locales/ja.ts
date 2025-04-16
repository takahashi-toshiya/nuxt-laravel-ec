export default defineI18nLocale(async () => ({
  // nameはテキストを表示する際に引数を渡すことができる部分
  product: {
    login_required: "カートへの追加はログイン後に利用できます。",
    add_to_cart: "カートに追加",
  },
  user: {
    title: "{name}様",
  },
  cart: {
    title: "{name}様のカートの中身",
  },
}));
