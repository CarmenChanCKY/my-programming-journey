import _Vue from "vue";

_Vue.prototype.$common = {
  getMediaPath(): string {
    return "/media/";
  },
};

declare module "vue/types/vue" {
  interface Vue {
    $common: {
      getMediaPath(): string;
    };
  }
}
