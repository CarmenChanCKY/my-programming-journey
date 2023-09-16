export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - My Programming Journey",
    title: "My Programming Journey",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/my_programming_journey_favicon.png",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/styles/global.scss",
    "~/assets/styles/post.scss",
    "~/assets/styles/prism.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/route.js",
    "~/plugins/axios.js",
    "~/plugins/filter/filter.ts",
    "~/plugins/prototype/common.ts",
    "~/plugins/prototype/validator.ts",
    { src: "~/plugins/vuex-persist.js", mode: "client" },
    { src: "~/plugins/prism.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/router", "@nuxtjs/color-mode"],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ["~/assets/styles/variables.scss"],
    theme: {
      options: {
        customProperties: true
      },
      themes: {
        light: {
          primary: "#007095",
          secondary: "#757575",
          accent: "#389BCC",
          error: "#FF5252",
          info: "#007095",
          success: "#4CAF50",
          warning: "#FFC107",
          colorText: "#2E2C2F",
          background: "#f7f7f7",
          drawerBackground: "#f7f7f7",
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
        dark: {
          primary: "#6cbfe8",
          secondary: "#b9b9b9",
          accent: "#2A8BBB",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          colorText: "#DBDBDB",
          background: "#2b2929",
          drawerBackground: "#333131",
          themeBtn: "#FFC107",
          borderLine: "#797979",
          dividerBorderLine: "#e3e3e3",
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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    trailingSlash: true,
    middleware: ["meta"],
    scrollBehavior(to, from, savedPosition) {
      document.body.scrollTo(0, 0);
      return { x: 0, y: 0 };
    },
  },

  loading: false,
};
