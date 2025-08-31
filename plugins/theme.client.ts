import { usePersistentStore } from "~/stores/app";

export default defineNuxtPlugin({
  dependsOn: ["vuetify:nuxt:client:plugin"],
  setup(nuxtApp) {
    const colorMode = useColorMode();
    const store = usePersistentStore();

    // set color theme if the colorMode preference is "system"
    if (colorMode.preference === "system") {
      let browserDarkTheme = false;

      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        browserDarkTheme = true;
      }

      colorMode.preference = browserDarkTheme ? "dark" : "light";
      store.setTheme(browserDarkTheme);
    }
  },
});
