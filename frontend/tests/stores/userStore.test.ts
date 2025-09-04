import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useUserStore } from "~/store/userStore";

describe("userStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("初期状態は全プロパティが null で、isLogged は false", () => {
    const userStore = useUserStore();
    expect(userStore.id).toBeNull();
    expect(userStore.name).toBeNull();
    expect(userStore.isLogged).toBe(false);
  });

  it("setUser でユーザーを保存し、isLogged が true になる", () => {
    const userStore = useUserStore();
    userStore.setUser({ id: 1, name: "テスト" });

    expect(userStore.id).toBe(1);
    expect(userStore.name).toBe("テスト");
    expect(userStore.isLogged).toBe(true);
  });

  it("resetUser で初期化され、isLogged は false に戻る", () => {
    const userStore = useUserStore();
    userStore.setUser({ id: 1, name: "テスト" });

    userStore.resetUser();
    expect(userStore.id).toBe(null);
    expect(userStore.name).toBe(null);
    expect(userStore.isLogged).toBe(false);
  });

  it("setUser を複数回呼ぶと最新値で上書きされる", () => {
    const userStore = useUserStore();
    userStore.setUser({ id: 1, name: "A" });
    userStore.setUser({ id: 2, name: "B" });

    expect(userStore.id).toBe(2);
    expect(userStore.name).toBe("B");
    expect(userStore.isLogged).toBe(true);
  });
});
