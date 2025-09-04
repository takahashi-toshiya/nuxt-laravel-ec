import { mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import TextInput from "~/components/common/TextInput.vue";
import FormField from "~/components/common/FormField.vue";

describe("FormField", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(FormField, {
      props: {
        id: "hoge",
        label: "ラベル",
        modelValue: "test",
        placeholder: "プレスホルダー",
        errorMessage: "エラーメッセージ",
      },
    });
  });

  it("正しくレンダリングされる", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("propsのidが正しく適用される", () => {
    expect(wrapper.findComponent(TextInput).props().id).toBe("hoge");
  });

  it("propsのlabelが正しく適用される", () => {
    expect(wrapper.find("label").text()).toBe("ラベル");
  });

  it("propsのmodelが正しく適用される", () => {
    expect(wrapper.findComponent(TextInput).props().modelValue).toBe("test");
  });

  it("propsのplaceholderが正しく適用される", () => {
    expect(wrapper.findComponent(TextInput).props().placeholder).toBe(
      "プレスホルダー"
    );
  });

  it("propsのエラーメッセージが正しく適用される", () => {
    expect(wrapper.find(".error-message").text()).toBe("エラーメッセージ");
  });

  it("エラーメッセージがない場合、エラー要素が表示されない", () => {
    wrapper = mount(FormField, {
      props: {
        id: "hoge",
        label: "ラベル",
        modelValue: "test",
      },
    });
    expect(wrapper.find(".error-message").exists()).toBe(false);
  });

  it("emitが正しく動作している", async () => {
    const input = wrapper.findComponent(TextInput);
    await input.setValue("テスト入力");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["テスト入力"]);
  });
});
