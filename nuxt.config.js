import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - my-programming-journey",
    title: "my-programming-journey",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/styles/global.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/filter/filter.ts",
    "~/plugins/prototype/common.ts",
    "~/plugins/prototype/validator.ts",
    { src: "~/plugins/vuex-persist.js", mode: "client" },
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
  modules: [],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/styles/variables.scss"],
    theme: {
      options: {
        customProperties: true,
      },
      themes: {
        // TODO: https://color.hailpixel.com/#007095,F9F8FF,D0E8F2,2E2C2F,373F51
        light: {
          primary: "#007095",
          secondary: "#757575",
          accent: "#389BCC",
          error: "#FF5252",
          info: "#007095",
          success: "#4CAF50",
          warning: "#FFC107",
          text: "#2E2C2F",
          background: "#ffffff",
          themeBtn: "#FF6C00",
          borderLine: "#cacaca",
          blockquote: "#0087ff",
          vCard: "#fdfdfd",
          editorButton: "#8be2ff",
          inlineCodeText: "#d22222",
        },
        dark: {
          // TODO: https://color.hailpixel.com/#6CBFE8,2E2C2F,E8E8E8,CAF0F8,B9B9B9
          primary: "#6cbfe8",
          secondary: "#b9b9b9",
          accent: "#2A8BBB",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          text: "#e8e8e8",
          background: "#2E2C2F",
          themeBtn: "#FFC107",
          borderLine: "#797979",
          blockquote: "#0087ff",
          vCard: "#373737",
          editorButton: "#0d829d",
        },
      },
      dark: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
