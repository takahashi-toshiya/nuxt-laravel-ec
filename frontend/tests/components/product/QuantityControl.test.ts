import { mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import QuantityControl from "~/components/product/QuantityControl.vue";

describe("QuantityControl", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(QuantityControl, {
      props: {
        productId: 1,
        cart: {
          prodct: {
            name: "test",
            price: "1000",
            stock: 10,
            comment: "test",
            imagePath: "image",
            alt: "alt",
          },
          quantity: 1,
        },
      },
    });
  });

  it("レンダリングが正しくされる", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("数量が正しく表示される", () => {
    expect(wrapper.find("span").text()).toBe("1");
  });

  it("数量が1の時×が表示される", () => {
    expect(wrapper.findAll("button")[0].text()).toBe("×");
  });

  it("数量が1以上の時-が表示される", () => {
    wrapper = mount(QuantityControl, {
      props: {
        productId: 1,
        cart: {
          prodct: {
            name: "test",
            price: "1000",
            stock: 10,
            comment: "test",
            imagePath: "image",
            alt: "alt",
          },
          quantity: 2,
        },
      },
    });

    expect(wrapper.findAll("button")[0].text()).toBe("−");
  });

  it("+ボタンが押下される", () => {
    wrapper.findAll("button")[1].trigger("click");

    expect(wrapper.emitted().increment).toBeTruthy();
    expect(wrapper.emitted("increment")).toHaveLength(1);
  });

  it("-ボタンが押下される", () => {
    wrapper.findAll("button")[0].trigger("click");

    expect(wrapper.emitted().decrementOrRemove).toBeTruthy();
    expect(wrapper.emitted("decrementOrRemove")).toHaveLength(1);
  });
});
