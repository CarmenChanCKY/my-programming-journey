import VuexPersistence from "vuex-persist";
import Cookies from "js-cookie";

export default ({ store }) => {
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

  store.dispatch("persistent/setTheme", browserDarkTheme);
};
