// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: [
    "~/assets/styles/global.scss",
    "~/assets/styles/post.scss",
    "~/assets/styles/prism.css",
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "keyword",
          content:
            "My Programming Journey, Programming Journey, CarmenChanCKY, Carmen Chan, Programming Blog",
        },
        {
          name: "description",
          content: "Learn from my past experience and faults.",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "og:type", content: "website" },
        {
          name: "og:title",
          content: "My Programming Journey",
        },
        {
          name: "og:site_name",
          content: "My Programming Journey",
        },
        { name: "og:locale", content: "en" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/my_programming_journey_favicon.png",
        },
      ],
      noscript: [
        {
          innerHTML:
            "This website requires JavaScript. Please enable your browser's JavaScript.",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      backendUrl: "",
    },
  },
  modules: [
    "vuetify-nuxt-module",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: "append",
      },
    },
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* other vuetify options */
      theme: {
        variations: false,
        themes: {
          light: {
            dark: false,
            colors: {
              primary: "#007095",
              primaryHover: "#54a4cb",
              accent: "#757575",
              colorText: "#232023",
              background: "#f2f2f2",
              drawerBackground: "#f2f2f2",
              themeBtn: "#FF6C00",
              borderLine: "#cacaca",
              dividerBorderLine: "#e3e3e3",
              blockquote: "#0087ff",
              inlineCodeText: "#bf2525",
              inlineCodeBackground: "#eaeaea",
              codeBackground: "#1f2224",
              tableHeader: "#353535",
              tableHighLight: "#ececec",
              textFieldBackground: "#f7f7f7",
              textfieldBorder: "#c8c8c8",
              searchResultText: "#484848",
              categoryChip: "#eaeaea",
            },
          },
          dark: {
            dark: true,
            colors: {
              primary: "#6cbfe8",
              primaryHover: "#a7f7ff",
              accent: "#b9b9b9",
              colorText: "#DBDBDB",
              background: "#232023",
              drawerBackground: "#333131",
              themeBtn: "#FFC107",
              borderLine: "#797979",
              dividerBorderLine: "#6a6a6a",
              blockquote: "#0087ff",
              inlineCodeText: "#ff8a8a",
              inlineCodeBackground: "#353535",
              codeBackground: "#333",
              tableHeader: "#3e3e3e",
              tableHighLight: "#2f2f2f",
              textFieldBackground: "#333333",
              textfieldBorder: "#404040",
              searchResultText: "#c6c6c6",
              categoryChip: "#393939",
            },
          },
        },
      },
      icons: {
        defaultSet: "mdi",
      },
    },
  },
});
