import { mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { fa } from "zod/v4/locales";
import LoadingOverlay from "~/components/common/LoadingOverlay.vue";
import LoadingSpinner from "~/components/common/LoadingSpinner.vue";

describe("LoadingOverlay", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(LoadingOverlay, {
      props: {
        isVisible: true,
        text: "テスト",
        spinnerSize: "small",
        backgroundColor: "#f0f0f0",
        overlayClass: "test",
      },
      global: {
        stubs: {
          LoadingSpinner: true, // LoadingSpinnerをスタブ化
        },
      },
    });
  });

  it("正しくレンダリングされる", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("propsのisViibleが正しく適用される", () => {
    expect(wrapper.find(".loading-overlay").exists()).toBe(true);
  });

  it("propsのisViibleがfalseの場合非表示になる", () => {
    wrapper = mount(LoadingOverlay, {
      props: {
        isVisible: false,
      },
    });
    expect(wrapper.find(".loading-overlay").exists()).toBe(false);
  });

  it("propsのtextが正しく適用される", () => {
    expect(wrapper.findComponent(LoadingSpinner).props().text).toBe("テスト");
  });

  it("propsのspinnerSizeが正しく適用される", () => {
    expect(wrapper.findComponent(LoadingSpinner).props().size).toBe("small");
  });

  it("propsのbackgroundColorが正しく適用される", () => {
    expect(wrapper.find(".loading-overlay").attributes().style).toBe(
      "background-color: #f0f0f0;"
    );
  });

  it("propsのoverlayClassが正しく適用される", () => {
    expect(wrapper.find(".loading-overlay").classes()).toContain("test");
  });
});
