import { usePersistentStore } from "~/stores/app";

export default defineNuxtPlugin({
  setup(nuxtApp) {
    const colorMode = useColorMode();
    const store = usePersistentStore();
    const cookie = useCookie("isDarkTheme");

    let browserDarkTheme = false;
    if (
      cookie.value !== undefined &&
      cookie.value !== null &&
      typeof cookie.value === "boolean"
    ) {
      browserDarkTheme = cookie.value ? true : false;
    } else {
      browserDarkTheme = colorMode.value === "dark" ? true : false;
    }

    store.setTheme(browserDarkTheme);
  },
});
