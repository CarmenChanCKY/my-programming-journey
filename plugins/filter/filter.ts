import _Vue from "vue";

_Vue.filter("formatDate", (value: string) => {
  if (value === "") {
    return {};
  }

  return value.substring(0, 10);
});
