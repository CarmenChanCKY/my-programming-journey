import type { ActionTree, GetterTree, MutationTree } from "vuex";
import Cookies from "js-cookie";
import { RootState } from "~/store";
import Vuetify from "@nuxtjs/vuetify";

const cookieConfig: object = {
  path: "/",
  expires: 30,
  sameSite: "strict",
  secure: true,
};

export type PersistentState = ReturnType<typeof state>;

const currentTheme = Cookies.get("isDarkTheme");

export const state = () => ({
  isDarkTheme:
    currentTheme === undefined ? false : currentTheme === "1" ? true : false,
});

/* if (currentTheme !== undefined) {
    Cookies.set("isDarkTheme", currentTheme === "1" ? "1" : "0", cookieConfig);
    Vuetify.prototype.theme.dark = state.isDarkTheme;
    //Vuetify.theme.dark = state.isDarkTheme;
    document.documentElement.setAttribute("theme", currentTheme === "1" ? "dark" : "light")
} */

export const getters: GetterTree<PersistentState, RootState> = {
  isDarkTheme: (state): boolean => state.isDarkTheme,
};

export const mutations: MutationTree<PersistentState> = {
  setTheme(state) {
    state.isDarkTheme = !state.isDarkTheme;
    Cookies.set("isDarkTheme", state.isDarkTheme ? "1" : "0", cookieConfig);
    if (process.browser) {
      document.documentElement.setAttribute(
        "theme",
        state.isDarkTheme ? "dark" : "light"
      );
    }
  },
};

export const actions: ActionTree<PersistentState, RootState> = {
  setTheme({ commit }) {
    commit("setTheme");
  },
};
