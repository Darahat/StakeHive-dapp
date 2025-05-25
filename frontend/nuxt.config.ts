// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
   
  // nitro: {
  //   preset: 'vercel', // or 'netlify' depending on your target
  // },
    // target: 'server',
   nitro: {
    preset: 'netlify'  // Required for SSR
  },

  app: {
    head: {
      script: [
        {
          src: 'https://cdn.tailwindcss.com',
          tagPosition: 'head',
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/daisyui@latest',
          tagPosition: 'head',
        },
       
      ],
    },
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
   ],
    piniaPersistedstate: {
    storage: 'localStorage'
  }
})