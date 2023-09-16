import goTo from "vuetify/lib/services/goto";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const getComponent = (file) => {
  return () => import(`~/pages/${file}.vue`).then((m) => m.default || m);
};

const routes = [
  {
    path: "/post/:slug",
    name: "PostDetail",
    component: getComponent("PostContent"),
    meta: {
      fullHeader: false,
      source: "post",
    },
  },
  {
    path: "/search/:keyword/:pages?",
    name: "SearchKeywordResult",
    component: getComponent("SearchResult"),
    meta: {
      fullHeader: false,
      source: "search",
    },
  },
  {
    path: "/category",
    name: "CategoryList",
    component: getComponent("CategoryList"),
    meta: {
      fullHeader: false,
    },
  },
  {
    path: "/category/search/:keyword/:pages?",
    name: "SearchCategoryResult",
    component: getComponent("SearchResult"),
    meta: {
      fullHeader: false,
      source: "category",
    },
  },
  {
    path: "/tags",
    name: "TagList",
    component: getComponent("TagList"),
    meta: {
      fullHeader: false,
    },
  },
  {
    path: "/:pages?",
    name: "Home",
    component: getComponent("Home"),
    meta: {
      fullHeader: true,
    },
  },
];

export function createRouter() {
  return new Router({
    mode: "history",
    routes,
  });
}
// https://github.com/nuxt-community/router-module
