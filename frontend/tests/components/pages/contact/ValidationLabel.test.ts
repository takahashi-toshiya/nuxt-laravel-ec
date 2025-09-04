import { mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { tr } from "zod/v4/locales";
import ValidationLabel from "~/components/pages/contact/ValidationLabel.vue";

describe("ValidationLabel", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(ValidationLabel, {
      props: {
        mode: "required",
      },
    });
  });

  it("正しくレンダリングされる", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("modeが必須の場合", () => {
    expect(wrapper.find(".required").exists()).toBe(true);
  });

  it("modeが任意の場合", () => {
    wrapper = mount(ValidationLabel, {
      props: {
        mode: "optional",
      },
    });
    expect(wrapper.find(".optional").exists()).toBe(true);
  });
});
