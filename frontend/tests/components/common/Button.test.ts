import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Button from "~/components/common/Button.vue";

describe("Button Component", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(Button, {
      props: {
        label: "テストボタン",
        color: "red",
      },
    });
  });

  it("正しくレンダリングされる", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("propsのlabelが表示される", () => {
    expect(wrapper.text()).toBe("テストボタン");
  });

  it("propsのcolorクラスが適用される", () => {
    expect(wrapper.classes()).toContain("red");
  });

  it("クリック時にemitが発火する", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted("button-click")).toBeTruthy();
    expect(wrapper.emitted("button-click")).toHaveLength(1);
  });

  it("blueカラーも正しく適用される", () => {
    const blueWrapper = mount(Button, {
      props: {
        label: "青ボタン",
        color: "blue",
      },
    });
    expect(blueWrapper.classes()).toContain("blue");
  });
});
