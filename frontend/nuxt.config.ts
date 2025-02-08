// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/css/global.css"],
  modules: ["@pinia/nuxt"],
  // 原理をよく調べておく
  vite: {
    server: {
      hmr: {
        protocol: "ws",
        host: "0.0.0.0", // ← コンテナ内で `0.0.0.0` に変更
        port: 24678,
        clientPort: 24678,
        timeout: 30000,
      },
      watch: {
        usePolling: true,
        interval: 1000,
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
          host: "localhost",
          port: 24678,
        },
      };
    },
  },
});
