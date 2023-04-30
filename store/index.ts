import type { ActionTree, GetterTree, MutationTree } from "vuex";

export type RootState = ReturnType<typeof state>;

export const state = () => ({
  startLoading: false,
});

export const getters: GetterTree<RootState, RootState> = {
  startLoading: (state): boolean => state.startLoading,
};

export const mutations: MutationTree<RootState> = {
  setLoading(state, loading: boolean) {
    state.startLoading = loading;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  setLoading({ commit }, loading: boolean) {
    commit("setLoading", loading);
  },
};
