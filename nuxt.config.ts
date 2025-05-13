export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/style.css"],
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_API_URL,
      cognitoRegion: process.env.NUXT_COGNITO_REGION,
      cognitoClientId: process.env.NUXT_COGNITO_CLIENT_ID,
      cognitoUserPoolId: process.env.NUXT_COGNITO_USER_POOL_ID,
    },
  },
});
