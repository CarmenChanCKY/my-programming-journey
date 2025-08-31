import type { RouterConfig } from "@nuxt/schema";

const getComponent = (file: string) => {
  return () => import(`~/pages/${file}.vue`).then((m) => m.default || m);
};

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  hashMode: true,
  scrollBehaviorType: "smooth",
  routes: (_routes) => [
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
      path: "/tags/search/:keyword/:pages?",
      name: "SearchTagResult",
      component: getComponent("SearchResult"),
      meta: {
        fullHeader: false,
        source: "tags",
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
      path: "/archive/:pages?",
      name: "Archive",
      component: getComponent("Archive"),
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
  ],
} satisfies RouterConfig;
