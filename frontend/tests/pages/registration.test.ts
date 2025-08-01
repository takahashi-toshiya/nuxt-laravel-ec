import { mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import FormField from "~/components/common/FormField.vue";
import CardLayout from "~/components/layouts/CardLayout.vue";
import FormLayout from "~/components/layouts/FormLayout.vue";
import Registration from "~/pages/registration.vue";

describe("registration", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(Registration);
  });

  it("レンダリングが正しく実行される", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("CardLayoutが正しく設定されている", () => {
    const cardLayout = wrapper.findComponent(CardLayout);
    expect(cardLayout.exists()).toBe(true);
  });

  it("FormLayoutが正しく設定されている", () => {
    const formLayout = wrapper.findComponent(FormLayout);
    expect(formLayout.exists()).toBe(true);
    expect(formLayout.props("buttonText")).toBe("新規登録");
    expect(formLayout.props("buttonColor")).toBe("blue");
  });

  it("nameのFormFieldが正しく設定されている", () => {
    const formField = wrapper.findAllComponents(FormField)[0];
    expect(formField.exists()).toBe(true);
    expect(formField.props("id")).toBe("name");
    expect(formField.props("label")).toBe("名前");
    expect(formField.props("placeholder")).toBe("名前を入力してください");
  });

  it("emailのFormFieldが正しく設定されている", () => {
    const formField = wrapper.findAllComponents(FormField)[1];
    expect(formField.exists()).toBe(true);
    expect(formField.props("id")).toBe("email");
    expect(formField.props("label")).toBe("メールアドレス");
    expect(formField.props("placeholder")).toBe(
      "メールアドレスを入力してください"
    );
  });

  it("passwordのFormFieldが正しく設定されている", () => {
    const formField = wrapper.findAllComponents(FormField)[2];
    expect(formField.exists()).toBe(true);
    expect(formField.props("id")).toBe("password");
    expect(formField.props("label")).toBe("パスワード");
    expect(formField.props("placeholder")).toBe("パスワードを入力してください");
  });

  it("passwordConfirmのFormFieldが正しく設定されている", () => {
    const formField = wrapper.findAllComponents(FormField)[3];
    expect(formField.exists()).toBe(true);
    expect(formField.props("id")).toBe("passwordConfirmation");
    expect(formField.props("label")).toBe("パスワード（確認）");
    expect(formField.props("placeholder")).toBe(
      "パスワードを再度入力してください"
    );
  });

  it("nameのFormFieldのバリデーションが正しいこと", async () => {
    await (wrapper.vm as any).handleRegistration();

    const formField = wrapper.findAllComponents(FormField)[0];
    expect(formField.props("errorMessage")).toBe("名前は必須入力です。");
  });

  it("emailのFormFieldのバリデーションが正しいこと", async () => {
    await (wrapper.vm as any).handleRegistration();

    const formField = wrapper.findAllComponents(FormField)[1];
    expect(formField.props("errorMessage")).toBe(
      "メールアドレスは必須入力です。"
    );
  });

  it("パスワードのFormFieldのバリデーションが正しいこと", async () => {
    await (wrapper.vm as any).handleRegistration();

    const formField = wrapper.findAllComponents(FormField)[2];
    expect(formField.props("errorMessage")).toBe("パスワードは必須入力です。");
  });

  it("パスワード（確認）のFormFieldのバリデーションが正しいこと", async () => {
    await (wrapper.vm as any).handleRegistration();

    const formField = wrapper.findAllComponents(FormField)[3];
    expect(formField.props("errorMessage")).toBe(
      "パスワード確認は必須入力です。"
    );
  });

  it("パスワードの入力が一致した場合エラーメッセージが出ないこと", async () => {
    const passwordInput = wrapper.find("#password");
    await passwordInput.setValue("password");

    const passwordConfirmationInput = wrapper.find("#passwordConfirmation");
    await passwordConfirmationInput.setValue("password");

    await (wrapper.vm as any).handleRegistration();

    const formField = wrapper.findAllComponents(FormField)[3];
    expect(formField.props("errorMessage")).toBe(undefined);
  });

  it("パスワードの入力が不一致の場合エラーメッセージが出ること", async () => {
    const passwordInput = wrapper.find("#password");
    await passwordInput.setValue("password");

    const passwordConfirmationInput = wrapper.find("#passwordConfirmation");
    await passwordConfirmationInput.setValue("passwordあああ");

    await (wrapper.vm as any).handleRegistration();

    const formField = wrapper.findAllComponents(FormField)[3];
    expect(formField.props("errorMessage")).toBe("パスワードが一致しません。");
  });
});
