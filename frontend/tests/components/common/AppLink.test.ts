import { mount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import AppLink from "~/components/common/AppLink.vue";

describe.skip("AppLink", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(AppLink, {
      to: "example",
      label: "test",
      color: "blue",
    });
  });

  it("正しくレンダリングされる", () => {
    expect(wrapper.exists()).toBe("true");
  });
});
