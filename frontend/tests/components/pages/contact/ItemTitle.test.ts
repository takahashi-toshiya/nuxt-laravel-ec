import { mount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import ItemTitle from "~/components/pages/contact/ItemTitle.vue";
import ValidationLabel from "~/components/pages/contact/ValidationLabel.vue";

describe("ItemTitle", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(ItemTitle, {
      props: {
        label: "ラベル",
        required: true,
        uniqueId: "t001",
      },
    });
  });

  it("レンダリングできる", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("propsのrequiredがtrueの場合、labelが正しく反映される", () => {
    expect(wrapper.findComponent(ValidationLabel).props().mode).toBe(
      "required"
    );

    expect(
      wrapper.findComponent(ValidationLabel).find(".required").text()
    ).toBe("必須");

    expect(wrapper.find("label").text()).toBe("ラベル 必須");
  });

  it("propsのrequiredがfalseの場合、labelが正しく反映される", () => {
    wrapper = mount(ItemTitle, {
      props: {
        label: "ラベル",
        required: false,
        uniqueId: "t001",
      },
    });
    expect(wrapper.findComponent(ValidationLabel).props().mode).toBe(
      "optional"
    );

    expect(
      wrapper.findComponent(ValidationLabel).find(".optional").text()
    ).toBe("任意");

    expect(wrapper.find("label").text()).toBe("ラベル 任意");
  });
});
