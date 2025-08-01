import { mount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import ProductCard from "~/components/product/ProductCard.vue";
import ProductList from "~/components/product/ProductList.vue";
import QuantityControl from "~/components/product/QuantityControl.vue";
import type { ProductModel } from "~/types/model/ProductModel";

describe("ProductList", () => {
  let wrapper: VueWrapper;

  const i18n = createI18n({
    locale: "ja",
    messages: {
      ja: {
        product: { add_to_cart: "カートに追加" },
      },
    },
  });

  beforeEach(() => {
    wrapper = mount(ProductList, {
      props: {
        products: [
          {
            id: 1,
            name: "test",
            price: 1000,
            stock: 10,
            comment: "コメント",
            imagePath: "url",
            alt: "altテスト",
          },
        ],
        carts: [
          {
            product: {
              id: 1,
              name: "test",
              price: 1000,
              stock: 10,
              comment: "コメント",
              imagePath: "url",
              alt: "altテスト",
            },
            quantity: 1,
          },
        ],
      },
      global: {
        plugins: [i18n],
      },
    });
  });

  it("レンダリングが正しく行われる", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("ProductCardが正しく設定されている", () => {
    const productCard = wrapper.findComponent(ProductCard);

    expect(productCard.find("img").attributes("src")).toBe("url");
    expect(productCard.find(".product-card__title").text()).toBe("test");
    expect(productCard.find(".product-card__comment").text()).toBe("コメント");
  });

  it("QuantityControlが正しく設定されている", () => {
    const quantityControl = wrapper.findComponent(QuantityControl);

    expect(quantityControl.find("span").text()).toBe("1");
    expect(quantityControl.findAll("button")[0].text()).toBe("×");
  });

  // emit関連も書いてく
  it("QuantityControlのemitのincrementが正しく動作する", async () => {
    const incrementButton = wrapper
      .findComponent(QuantityControl)
      .findAll("button")[1];
    await incrementButton.trigger("click");

    expect(wrapper.emitted().increment).toBeTruthy();
    expect(wrapper.emitted().increment[0]).toEqual([1]);
  });

  it("QuantityControlのemitのdecrementOrRemoveが正しく動作する", async () => {
    const decrementOrRemove = wrapper
      .findComponent(QuantityControl)
      .findAll("button")[0];

    await decrementOrRemove.trigger("click");

    expect(wrapper.emitted().decrementOrRemove).toBeTruthy();
    expect(wrapper.emitted().decrementOrRemove[0]).toEqual([1]);
  });

  it("cartButtonClickが正しく動作する", async () => {
    wrapper = mount(ProductList, {
      props: {
        products: [
          {
            id: 1,
            name: "test",
            price: 1000,
            stock: 10,
            comment: "コメント",
            imagePath: "url",
            alt: "altテスト",
          },
        ],
        carts: [
          {
            product: {
              id: 2,
              name: "test",
              price: 1000,
              stock: 10,
              comment: "コメント",
              imagePath: "url",
              alt: "altテスト",
            },
            quantity: 1,
          },
        ],
      },
      global: {
        plugins: [i18n],
      },
    });
    await wrapper.find(".product-card__button").trigger("click");

    const emittedEvents = wrapper.emitted().cartButtonClick as ProductModel[][];

    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents[0][0].id).toBe(1);
    expect(emittedEvents[0][0].imagePath).toBe("url");
    expect(emittedEvents[0][0].name).toBe("test");
    expect(emittedEvents[0][0].price).toBe(1000);
    expect(emittedEvents[0][0].stock).toBe(10);
    expect(emittedEvents[0][0].comment).toBe("コメント");
    expect(emittedEvents[0][0].alt).toBe("altテスト");
  });
});
