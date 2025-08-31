import { defineStore } from "pinia";
import Cookies from "js-cookie";

const cookieConfig: object = {
  path: "/",
  expires: 30,
  sameSite: "strict",
  secure: true,
};

interface RootStateInterface {
  startLoading: boolean;
}

interface PersistentStateInterface {
  isDarkTheme: boolean;
  isFullHeader: boolean;
}

export const useRootStore = defineStore("root", {
  state: (): RootStateInterface => ({
    startLoading: false,
  }),
  getters: {
    getLoading: (state): boolean => state.startLoading,
  },
  actions: {
    setLoading(state: boolean) {
      this.startLoading = state;
    },
  },
});

export const usePersistentStore = defineStore("persistent", {
  state: (): PersistentStateInterface => ({
    isDarkTheme: false,
    isFullHeader: false,
  }),
  getters: {
    getIsDarkTheme: (state): boolean => state.isDarkTheme,
    getFullHeader: (state): boolean => state.isFullHeader,
  },
  actions: {
    setTheme(state: boolean) {
      this.isDarkTheme = state;
      Cookies.set("isDarkTheme", state ? "true" : "false", cookieConfig);
    },
    setFullHeader(state: boolean) {
      this.isFullHeader = state;
    },
  },
  persist: { key: "my-programming-journey" },
});
