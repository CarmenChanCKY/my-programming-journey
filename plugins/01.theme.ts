export default defineNuxtPlugin((nuxt) => {
  const colorMode = useColorMode();
  const persistentStore = usePersistentStore();
  const cookie = useCookie("isDarkTheme");
  let browserDarkTheme = false;
  let isSystemPreference = true;

  if (
    cookie.value !== undefined &&
    cookie.value !== null &&
    typeof cookie.value === "boolean"
  ) {
    browserDarkTheme = cookie.value ? true : false;
    isSystemPreference = false;
  } else {
    // preference: light / dark
    if (colorMode.preference === "light" || colorMode.preference === "dark") {
      isSystemPreference = false;
      browserDarkTheme = colorMode.preference === "dark" ? true : false;
    }
  }

  if (!isSystemPreference) {
    colorMode.preference = browserDarkTheme ? "dark" : "light";
    persistentStore.setTheme(browserDarkTheme);
    cookie.value = browserDarkTheme.toString();
  }
});
