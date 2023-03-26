import _Vue from "vue";

const isValid = (data: any): boolean => {
  if (data !== undefined && data !== null && data !== "") {
    if (typeof data === "object") {
      return Object.keys(data).length > 0;
    } else if (Array.isArray(data)) {
      return data.length > 0;
    }
    return true;
  } else {
    return false;
  }
};

_Vue.prototype.$validator = {
  isValid(data: any): boolean {
    return isValid(data);
  },
};

declare module "vue/types/vue" {
  interface Vue {
    $validator: {
      isValid(data: any): boolean;
    };
  }
}
