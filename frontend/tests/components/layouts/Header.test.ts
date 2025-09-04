import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Header from "~/components/layouts/Header.vue";
import { useUserStore } from "~/store/userStore";

describe("Header", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(Header, {
      global: {
        mocks: {
          $t: (key: string, params?: any) =>
            key + (params ? JSON.stringify(params) : ""),
        },
      },
    });
  });

  vi.mock("~/services/authService", () => ({
    logoutService: vi.fn().mockResolvedValue(undefined),
  }));

  it("レンダリングが正常に行われる", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("ログイン時の表示要素が表示される", async () => {
    const userStore = useUserStore();
    userStore.isLoggedIn = true;
    await nextTick();
    expect(wrapper.find("#login").exists()).toBe(true);
  });

  it("未ログイン時の表示要素が表示される", async () => {
    const userStore = useUserStore();
    userStore.isLoggedIn = false;
    await nextTick();
    expect(wrapper.find("#login").exists()).toBe(false);
  });

  it("ドロップダウンが閉じている", async () => {
    const userStore = useUserStore();
    userStore.isLoggedIn = true;
    await nextTick();

    const dropdown = wrapper.find(".nav__dropdown-menu");

    expect((dropdown.element as HTMLElement).style.display).toBe("none");
  });

  it("ドロップダウンが開いている", async () => {
    const userStore = useUserStore();
    userStore.isLoggedIn = true;
    await nextTick();

    await wrapper.find(".nav__toggle").trigger("click");
    expect(wrapper.find(".nav__dropdown-menu").isVisible()).toBe(true);
  });

  // 外部クリック通知
  it("ドロップダウンが開いている際に外部領域をクリックする", async () => {
    const userStore = useUserStore();
    userStore.isLoggedIn = true;
    await nextTick();

    await wrapper.find(".nav__toggle").trigger("click");

    // documentのクリックイベントを発火
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(clickEvent);
    await nextTick();

    expect((wrapper.vm as any).isDropdownVisible).toBe(false);
  });

  // ログアウト
  it("ログアウトが正常に行える", async () => {
    const userStore = useUserStore();
    userStore.isLoggedIn = true;
    await nextTick();

    // ドロップダウンを開く
    await wrapper.find(".nav__toggle").trigger("click");

    const dropdownItems = wrapper.findAll(".nav__dropdown-menu__item");
    expect(dropdownItems.length).toBe(2); // 2個あることを確認
    await dropdownItems[1].trigger("click"); // 2個目（ログアウト）をクリック

    await nextTick();

    // プロパティ名を統一
    expect(userStore.isLoggedIn).toBe(false);
  });
});
