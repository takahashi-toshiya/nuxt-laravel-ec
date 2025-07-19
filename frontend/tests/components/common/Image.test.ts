import { mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import Image from "~/components/common/Image.vue";

describe("Image Component", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(Image, {
      props: {
        src: "example",
        alt: "hoge",
      },
    });
  });

  it("正しくレンダリングされる", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("propsのsrcが設定される", () => {
    expect(wrapper.attributes().src).toBe("example");
  });

  it("propsのaltが設定される", () => {
    expect(wrapper.attributes().alt).toBe("hoge");
  });
});
