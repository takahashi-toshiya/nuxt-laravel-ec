import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";
import PaymentModal from "~/components/cart/PaymentModal.vue";
import Cart from "~/pages/cart.vue";
import { getCartService } from "~/services/cartService";
import { useCartStore } from "~/store/cartStore";
import { useUserStore } from "~/store/userStore";

// サービスをモック
vi.mock("~/services/cartService", () => ({
  getCartService: vi.fn(),
}));

describe("cart", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    setActivePinia(createPinia());

    // モックの戻り値を設定
    const mockGetCartService = vi.mocked(getCartService);
    mockGetCartService.mockReturnValue(
      Promise.resolve([
        {
          productId: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "テスト商品",
            price: 1000,
            stock: 10,
            comment: "テスト用の商品です",
            imagePath: "/test-image.jpg",
            alt: "テスト商品画像",
          },
        },
        {
          productId: 2,
          quantity: 1,
          product: {
            id: 2,
            name: "テスト商品2",
            price: 2000,
            stock: 20,
            comment: "テスト用の商品2です",
            imagePath: "/test-image2.jpg",
            alt: "テスト商品画像2",
          },
        },
      ])
    );

    const i18n = createI18n({
      locale: "ja",
      messages: {
        ja: {
          cart: {
            empty: "カートに商品がありません。",
          },
        },
      },
    });

    wrapper = mount(Cart, {
      global: {
        plugins: [i18n],
      },
    });
  });

  it("レンダリングが正しく実施される", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("タイトルが正しく表示される", async () => {
    const userStore = useUserStore();
    userStore.setUser({ id: 1, name: "test" });
    await nextTick();

    expect(wrapper.find(".cart__title").text()).toBe("testのカートの中身");
  });

  it("商品一覧が正しく表示される", async () => {
    const cartStore = useCartStore();
    await cartStore.getCart();

    const productItems = wrapper.findAll(".cart__product-item");
    expect(productItems).toHaveLength(2);

    // ProductCard内の実際の表示内容を確認
    // 1件目
    expect(wrapper.findAll(".product-card__title")[0].text()).toBe(
      "テスト商品"
    );
    expect(wrapper.findAll(".product-card__price")[0].text()).toBe("1,000");

    // 2件目
    expect(wrapper.findAll(".product-card__title")[1].text()).toBe(
      "テスト商品2"
    );
    expect(wrapper.findAll(".product-card__price")[1].text()).toBe("2,000");
  });

  it("合計個数が正しく表示されている", async () => {
    const cartStore = useCartStore();
    await cartStore.getCart();

    expect(wrapper.findAll(".cart__summary-description")[0].text()).toBe(
      "3 個"
    );
  });

  it("合計金額が正しく表示されている", async () => {
    const cartStore = useCartStore();
    await cartStore.getCart();

    expect(wrapper.findAll(".cart__summary-description")[1].text()).toBe(
      "¥4,000"
    );
  });

  it("決済をするボタン押下時にモーダルが表示される", async () => {
    const cartStore = useCartStore();
    await cartStore.getCart();

    wrapper.find(".cart__checkout-button").trigger("click");
    await nextTick();

    const paymentModal = wrapper.findComponent(PaymentModal);
    expect(paymentModal.props().totalPrice).toBe(4000);
    expect(paymentModal.exists()).toBe(true);
  });

  it("決済モーダルを正常に閉じれる", async () => {
    const cartStore = useCartStore();
    await cartStore.getCart();

    wrapper.find(".cart__checkout-button").trigger("click");
    await nextTick();
    expect(wrapper.findComponent(PaymentModal).exists()).toBe(true);

    const paymentModal = wrapper.findComponent(PaymentModal);
    paymentModal.vm.$emit("close");
    await nextTick();

    expect(paymentModal.exists()).toBe(false);
  });
});
