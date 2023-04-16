import type { ActionTree, GetterTree, MutationTree } from "vuex";
import Cookies from "js-cookie";
import { RootState } from "~/store";

const cookieConfig: object = {
  path: "/",
  expires: 30,
  sameSite: "strict",
  secure: true,
};

export type PersistentState = ReturnType<typeof state>;

export const state = () => ({
  isDarkTheme: false,
});

export const getters: GetterTree<PersistentState, RootState> = {
  isDarkTheme: (state): boolean => state.isDarkTheme,
};

export const mutations: MutationTree<PersistentState> = {
  setTheme(state, darkTheme) {
    state.isDarkTheme = darkTheme;
    Cookies.set("isDarkTheme", state.isDarkTheme ? "1" : "0", cookieConfig);
  },
  toggleTheme(state) {
    state.isDarkTheme = !state.isDarkTheme;
    Cookies.set("isDarkTheme", state.isDarkTheme ? "1" : "0", cookieConfig);
  },
};

export const actions: ActionTree<PersistentState, RootState> = {
  setTheme({ commit }, darkTheme) {
    commit("setTheme", darkTheme);
  },
  toggleTheme({ commit }) {
    commit("toggleTheme");
  },
};
