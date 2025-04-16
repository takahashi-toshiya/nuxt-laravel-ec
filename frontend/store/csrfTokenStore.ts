import { defineStore } from "pinia";

export const useCsrfTokenStore = defineStore("csrfToken", {
  state: () => ({
    token: null as string | null,
    expiry: 0,
  }),
  actions: {
    // Cookie から CSRF トークンを取得
    getCsrfToken() {
      if (this.token && Date.now() < this.expiry) {
        return this.token;
      }

      const matches = document.cookie.match(new RegExp("XSRF-TOKEN=([^;]+)"));
      const token = matches ? decodeURIComponent(matches[1]) : null;

      // トークンをメモ化（2 時間有効）
      this.token = token;
      this.expiry = Date.now() + 2 * 60 * 60 * 1000;

      return token;
    },

    // CSRF トークンを再取得
    async refreshCsrfToken() {
      await $fetch("http://localhost:8000/sanctum/csrf-cookie", {
        credentials: "include",
      });

      this.getCsrfToken();
    },

    // CSRF トークンを初期化（ログアウト後に呼ぶ）
    resetCsrfToken() {
      this.token = null;
      this.expiry = 0;
    },
  },
});
