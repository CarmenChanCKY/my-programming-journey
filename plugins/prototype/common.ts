import _Vue from "vue";

_Vue.prototype.$common = {
  log(value: any): void {
    console.log(value);
  },
  getMediaPath(): string {
    return "/media/";
  },
};

declare module "vue/types/vue" {
  interface Vue {
    $common: {
      log(value: any): void;
      getMediaPath(): string;
    };
  }
}
