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
              <v-icon>{{ leftIcon }}</v-icon>
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
              <v-icon>{{ rightIcon }}</v-icon>
            </div>
          </NuxtLink>
        </div>
      </section>
    </template>
    <template v-else>
      <div class="not-found-container">
        <div>Post not Found</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import PostCard from "~/components/PostCard.vue";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import type PostPageInterface from "~/interfaces/PostPageInterface";

@Component({
  components: {
    PostCard,
  },
})
export default class PostPage extends Vue {
  @Prop({ type: Array, default: () => [], required: true })
  postData!: Array<PostPageInterface>;
  @Prop({ type: Number, default: 0, required: true }) totalPost!: number;
  @Prop({ type: String, default: "", required: true }) pageType!: string;

  // data
  leftIcon: string = mdiChevronLeft;
  rightIcon: string = mdiChevronRight;

  limit: number = 10;

  routerName: string = "";

  previousRouterParams: any = {};
  nextRouterParams: any = {};

  get totalPage(): number {
    return Math.ceil(this.totalPost / this.limit);
  }

  // computed
  get currentPage() {
    const page = this.$route.params.pages;
    return page !== undefined &&
      page !== null &&
      page !== "" &&
      !isNaN(parseInt(page))
      ? parseInt(page)
      : 1;
  }

  get showPreviousBtn() {
    return this.currentPage >= 2;
  }

  get showNextBtn() {
    return this.postData.length === this.limit;
  }

  @Watch("pageType", { immediate: true })
  updatePageType(val: string) {
    switch (this.pageType) {
      case "post":
        this.routerName = "Home";
        this.previousRouterParams = {};
        this.nextRouterParams = {};
        break;
      case "category":
        this.routerName = "SearchCategoryResult";
        this.previousRouterParams = { keyword: this.$route.params.keyword };
        this.nextRouterParams = { keyword: this.$route.params.keyword };
        break;
      case "search":
        this.routerName = "SearchKeywordResult";
        this.previousRouterParams = { keyword: this.$route.params.keyword };
        this.nextRouterParams = { keyword: this.$route.params.keyword };
        break;
      case "tags":
        this.routerName = "SearchTagResult";
        this.previousRouterParams = { keyword: this.$route.params.keyword };
        this.nextRouterParams = { keyword: this.$route.params.keyword };
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

.post-card-container,
.pagination-container,
.not-found-container {
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
      color: var(--v-primary-base);
    }
  }
}

.current-pages {
  color: var(--v-secondary-base);
}

.not-found-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 100px;

  & > div {
    font-size: 1.75rem;
    font-weight: bold;
    color: var(--v-searchResultText-base);
  }
}
</style>
