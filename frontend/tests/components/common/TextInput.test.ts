import { mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import TextInput from "~/components/common/TextInput.vue";

describe("TextInput Component", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(TextInput, {
      props: {
        id: "test01",
        modelValue: "test",
        placeholder: "プレスホルダー",
        required: true,
      },
    });
  });

  it("正しくレンダリングされる", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("propsのidが適用される", () => {
    expect(wrapper.find("input").attributes().id).toBe("test01");
  });

  it("propsのmodeValueが適用される", () => {
    expect(wrapper.find("input").attributes().value).toBe("test");
  });

  it("propsのplaceholderが適切に設定される", () => {
    expect(wrapper.find("input").attributes().placeholder).toBe(
      "プレスホルダー"
    );
  });

  it("propsのrequiredが適切に設定される", () => {
    expect(wrapper.find("input").attributes().required).toBe("");
  });

  it("inputの入力が行われた場合", async () => {
    const input = wrapper.find("input");
    await input.setValue("新しい値");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["新しい値"]);
  });
});
