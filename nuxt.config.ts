export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/style.css"],
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_API_URL,
    },
  },
});
