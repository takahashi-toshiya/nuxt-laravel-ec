// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: {
    server: {
      hmr: {
        host: "localhost",
      },
      strictPort: true,
      watch: {
        usePolling: true,
      },
      allowedHosts: ["frontend", "localhost", "0.0.0.0"],
    },
  },
});
