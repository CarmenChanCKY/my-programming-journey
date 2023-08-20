import VuexPersistence from "vuex-persist";
import Cookies from "js-cookie";

export default ({ app, store }) => {
  new VuexPersistence({
    key: "MyProgrammingJourneyVuex",
    storage: window.localStorage,
    modules: ["persistent"],
  }).plugin(store);

  const currentTheme = Cookies.get("isDarkTheme");
  let browserDarkTheme = false;

  if (currentTheme === undefined) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      browserDarkTheme = true;
    }
  } else {
    browserDarkTheme = currentTheme === "1" ? true : false;
  }

  app.$colorMode.preference = currentTheme === "1" ? "dark" : "light";
  app.vuetify.framework.theme.isDark = browserDarkTheme;

  store.dispatch("persistent/setTheme", browserDarkTheme);
};
