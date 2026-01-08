export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  typescript: {
    typeCheck: false
  },
  ssr: true,
  css: ['~/assets/css/main.css']
})