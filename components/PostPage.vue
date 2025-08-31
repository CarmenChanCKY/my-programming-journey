<template>
  <div>
    <template v-if="totalPost > 0">
      <section class="post-card-container">
        <PostCard
          v-for="(data, index) of postData"
          :key="index"
          :post-data="data"
          :postRouter="{
            name: 'PostDetail',
            params: { slug: data.slug },
          }"
        ></PostCard>
      </section>
      <section class="pagination-container" v-if="!isNaN(currentPage)">
        <div>
          <NuxtLink
            class="prev-btn"
            :to="{
              name: routerName,
              params: {
                ...previousRouterParams,
                pages: parseInt(currentPage.toString()) - 1,
              },
            }"
            :style="{ visibility: showPreviousBtn ? 'visible' : 'hidden' }"
          >
            <div class="pagination">
              <v-icon size="small" icon="mdi mdi-chevron-left"></v-icon>
              Previous
            </div>
          </NuxtLink>
          <div class="current-pages">{{ currentPage }} / {{ totalPage }}</div>
          <NuxtLink
            class="next-btn"
            :to="{
              name: routerName,
              params: {
                ...nextRouterParams,
                pages: parseInt(currentPage.toString()) + 1,
              },
            }"
            :style="{ visibility: showNextBtn ? 'visible' : 'hidden' }"
          >
            <div class="pagination">
              Next
              <v-icon size="small" icon="mdi mdi-chevron-right"></v-icon>
            </div>
          </NuxtLink>
        </div>
      </section>
    </template>

    <div class="not-found-container" v-else>
      <div>Post not Found</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type PostPageInterface from "~/interfaces/PostPageInterface";

interface PostPageProps {
  postData: Array<PostPageInterface>;
  totalPost: number;
  pageType: "post" | "category" | "search" | "tags";
}

// props
const props = withDefaults(defineProps<PostPageProps>(), {
  postData: () => [] as Array<PostPageInterface>,
  totalPost: 0,
});

const route = useRoute();
const { isValid } = useValidator();

// data
const limit: number = 10;
const routerName = ref<string>("");
const previousRouterParams = ref({});
const nextRouterParams = ref({});

// computed
const totalPage = computed(() => {
  return Math.ceil(props.totalPost / limit);
});

const currentPage = computed(() => {
  const page = route.params.pages;
  const pageStr = Array.isArray(page) ? page[0] : page;

  return isValid(pageStr) && !isNaN(parseInt(pageStr)) ? parseInt(pageStr) : 1;
});

const showPreviousBtn = computed(() => {
  return currentPage.value >= 2;
});

const showNextBtn = computed(() => {
  return props.postData.length === limit;
});

// watch
watch(
  () => props.pageType,
  function (newVal: string) {
    const keyword: string = Array.isArray(route.params.keyword)
      ? route.params.keyword[0]
      : route.params.keyword;
    switch (newVal) {
      case "post":
        routerName.value = "Home";
        previousRouterParams.value = {};
        nextRouterParams.value = {};
        break;
      case "category":
        routerName.value = "SearchCategoryResult";
        previousRouterParams.value = { keyword: keyword };
        nextRouterParams.value = { keyword: keyword };
        break;
      case "search":
        routerName.value = "SearchKeywordResult";
        previousRouterParams.value = { keyword: keyword };
        nextRouterParams.value = { keyword: keyword };
        break;
      case "tags":
        routerName.value = "SearchTagResult";
        previousRouterParams.value = { keyword: keyword };
        nextRouterParams.value = { keyword: keyword };
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
@use "~/assets/styles/global.scss" as *;

.post-card-container,
.pagination-container {
  @extend %center-div;
}

.pagination-container {
  margin-top: 30px;
  margin-bottom: 30px;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.pagination {
  @extend %button;
  font-size: 1.125rem;

  &:hover {
    @extend %button-hover;

    & .v-icon {
      color: rgb(var(--v-theme-primary));
    }
  }
}

.current-pages {
  color: rgb(var(--v-theme-accent));
}
</style>
