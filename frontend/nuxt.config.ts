// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/css/global.css"],
  modules: ["@pinia/nuxt", "@nuxt/ui", "@nuxtjs/i18n", "nuxt-mcp"],
  i18n: {
    strategy: "prefix_except_default", // デフォルト言語はプレフィックス無し
    defaultLocale: "ja", // デフォルト言語を日本語
    // 各言語の設定
    locales: [
      { code: "ja", language: "ja-JP", name: "Japanese", file: "ja.ts" },
    ],
  },
  vite: {
    server: {
      hmr: {
        protocol: "ws",
        host: "0.0.0.0", // ← コンテナ内で `0.0.0.0` に変更
        port: 24678,
      },
      allowedHosts: ["frontend", "localhost", "0.0.0.0"],
    },
  },
  hooks: {
    "vite:extendConfig"(viteInlineConfig, env) {
      viteInlineConfig.server = {
        ...viteInlineConfig.server,
        hmr: {
          protocol: "ws",
          host: "0.0.0.0",
          port: 24678,
        },
      };
    },
  },
});
