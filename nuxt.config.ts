import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Battambang:wght@300;400;700&family=Moul&family=Moulpali&family=Taprom&family=family=Metal&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap',
        },
      ],
    },
  },

  i18n: {
    locales: [
      { code: 'km', name: 'ខ្មែរ', file: 'km.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'km',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    lazy: true,
    langDir: '../i18n/locales',
  },

  runtimeConfig: {
    public: {
      directusUrl: '',
      directusToken: '',
    },
  },
})
