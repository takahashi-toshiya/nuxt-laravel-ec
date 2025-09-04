import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCartStore } from "~/store/cartStore";

describe("カートストアのテスト", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  vi.mock("~/services/cartService", () => ({
    getCartService: vi.fn().mockResolvedValue([
      {
        productId: 1,
        product: {
          id: 1,
          name: "テスト商品",
          price: 1000,
          stock: 5,
          comment: "コメント",
          imagePath: "path",
        },
        quantity: 2,
      },
      {
        productId: 2,
        product: {
          id: 2,
          name: "テスト商品2",
          price: 2000,
          stock: 3,
          comment: "コメント2",
          imagePath: "path2",
        },
        quantity: 1,
      },
    ]),
  }));

  it("初期状態はカートが空で、一覧は長さ0である", () => {
    const store = useCartStore();
    expect(store.cart.size).toBe(0); // Map が空
    expect(store.cartList).toHaveLength(0); // 一覧も空
  });

  it("カートの情報を取得しストアに保持できる", async () => {
    const store = useCartStore();
    await store.getCart();

    const cartList = store.cartList;
    expect(cartList).toHaveLength(2);
    expect(cartList[0].product.id).toBe(1);
    expect(cartList[0].quantity).toBe(2);
    expect(cartList[1].product.id).toBe(2);
    expect(cartList[1].quantity).toBe(1);
  });

  it("カートに商品を追加できる", () => {
    const store = useCartStore();
    store.addCart({
      id: 1,
      name: "テスト",
      price: 1000,
      stock: 1,
      comment: "コメント",
      imagePath: "image123",
    });

    expect(store.cartList).toHaveLength(1);

    const item = store.cart.get(1);
    expect(item).toBeTruthy();
    expect(item?.product.id).toBe(1);
    expect(item?.quantity).toBe(1);
  });

  it("カートの商品一覧を取得できる", () => {
    const store = useCartStore();
    store.addCart({
      id: 1,
      name: "テスト",
      price: 1000,
      stock: 1,
      comment: "コメント",
      imagePath: "image123",
    });
    store.addCart({
      id: 2,
      name: "テスト2",
      price: 2000,
      stock: 2,
      comment: "コメント2",
      imagePath: "image1232",
    });

    const list = store.cartList;
    expect(list).toHaveLength(2);
    expect(list[0].product.id).toBe(1);
    expect(list[1].product.id).toBe(2);
    expect(list[0].quantity).toBe(1);
    expect(list[1].quantity).toBe(1);
  });

  it("商品の個数のincrementができる", () => {
    const store = useCartStore();
    store.addCart({
      id: 1,
      name: "テスト",
      price: 1000,
      stock: 1,
      comment: "コメント",
      imagePath: "image123",
    });

    store.incrementQuantity(1);
    expect(store.cart.get(1)?.quantity).toBe(2);
  });

  it("存在しない商品IDでincrementしても何も起こらない", () => {
    const store = useCartStore();
    const initialSize = store.cartList.length;

    store.incrementQuantity(999);
    expect(store.cartList).toHaveLength(initialSize);
    expect(store.cart.get(999)).toBe(undefined);
  });

  it("商品の個数の減算ができる", () => {
    const store = useCartStore();
    store.addCart({
      id: 1,
      name: "テスト",
      price: 1000,
      stock: 1,
      comment: "コメント",
      imagePath: "image123",
    });

    store.incrementQuantity(1);
    store.decrementQuantity(1);

    expect(store.cart.get(1)?.quantity).toBe(1);
  });

  it("存在しない商品IDでdecrementしても何も起こらない", () => {
    const store = useCartStore();
    const initialSize = store.cartList.length;

    store.incrementQuantity(999);

    expect(store.cartList).toHaveLength(initialSize);
    expect(store.cart.get(999)).toBeUndefined();
  });

  it("数量が1以下の場合decrementしても何も起こらない", () => {
    const store = useCartStore();
    store.addCart({
      id: 1,
      name: "テスト",
      price: 1000,
      stock: 1,
      comment: "コメント",
      imagePath: "image123",
    });

    store.decrementQuantity(1);

    expect(store.cart.get(1)?.quantity).toBe(1);
  });

  it("カートから商品を削除する", () => {
    const store = useCartStore();
    store.addCart({
      id: 1,
      name: "テスト",
      price: 1000,
      stock: 1,
      comment: "コメント",
      imagePath: "image123",
    });

    store.removeCart(1);
    expect(store.cart.get(1)).toBe(undefined);
  });

  it("カートをクリアできる（空に対しても安全）", () => {
    const store = useCartStore();
    // 空での clear は安全
    store.clearCart();
    expect(store.cart.size).toBe(0);
    expect(store.cartList).toHaveLength(0);

    // データ投入後に clear
    store.addCart({
      id: 1,
      name: "テスト",
      price: 1000,
      stock: 10,
      comment: "c",
      imagePath: "p",
    });
    store.addCart({
      id: 2,
      name: "テスト2",
      price: 2000,
      stock: 5,
      comment: "c2",
      imagePath: "p2",
    });
    expect(store.cartList).toHaveLength(2);

    store.clearCart();

    expect(store.cart.size).toBe(0);
    expect(store.cartList).toHaveLength(0);
  });
});
