import { mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import Image from "~/components/common/Image.vue";
import ProductCard from "~/components/product/ProductCard.vue";

describe("ProductCard", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(ProductCard, {
      props: {
        product: {
          id: 1,
          name: "テスト",
          price: 1000,
          stock: 10,
          comment: "テスト",
          imagePath: "testpath",
          alt: "altテスト",
        },
        showComment: true,
      },
    });
  });

  it("レンダリングが実行される", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("propsのproductが正しく適応される", () => {
    expect(wrapper.find(".product-card__title").text()).toBe("テスト");
    expect(wrapper.find(".product-card__price").text()).toBe("1,000");
    expect(wrapper.find(".product-card__comment").text()).toBe("テスト");

    expect(wrapper.findComponent(Image).props().src).toBe("testpath");
    expect(wrapper.findComponent(Image).props().alt).toBe("altテスト");
  });

  it("propsのshowCommentがtrueの場合", () => {
    expect(wrapper.find(".product-card__comment").exists()).toBe(true);
  });

  it("propsのshowCommentがfalseの場合", () => {
    wrapper = mount(ProductCard, {
      props: {
        product: {
          id: 1,
          name: "テスト",
          price: 1000,
          stock: 10,
          comment: "テスト",
          imagePath: "testpath",
          alt: "altテスト",
        },
        showComment: false,
      },
    });
    expect(wrapper.find(".product-card__comment").exists()).toBe(false);
  });
});
