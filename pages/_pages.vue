<template>
  <div>
    <section class="post-card-container">
      <PostCard
        v-for="(data, index) of postData"
        :key="index"
        :post-data="data"
      ></PostCard>
    </section>
    <section class="pagination-container" v-if="!isNaN(currentPage)">
      <div>
        <NuxtLink
          class="prev-btn"
          :to="`/${parseInt(currentPage.toString()) - 1}`"
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
          :to="`/${parseInt(currentPage.toString()) + 1}`"
          :style="{ visibility: showNextBtn ? 'visible' : 'hidden' }"
        >
          <div class="pagination">
            Next
            <v-icon>{{ rightIcon }}</v-icon>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PostCard from "~/components/PostCard.vue";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";

@Component({
  components: {
    PostCard,
  },
})
export default class Index extends Vue {
  // data

  leftIcon: string = mdiChevronLeft;
  rightIcon: string = mdiChevronRight;
  postData = [];

  currentPage: number = 1;
  limit: number = 10;
  totalPost: number = 0;

  get totalPage(): number {
    return Math.ceil(this.totalPost / this.limit);
  }

  // computed
  get showPreviousBtn() {
    return this.currentPage >= 2;
  }

  get showNextBtn() {
    return this.postData.length === this.limit;
  }

  async asyncData({ $axios, params, error }: any) {
    try {
      let pages = 1;
      if (params.pages !== undefined) {
        pages = params.pages;
      }

      const postData = await $axios.$get("/post/list", {
        params: { pages },
      });

      const formatData = [];

      for (let i = 0; i < postData.data.length; i++) {
        const data = {
          title: postData.data[i].title,
          date: postData.data[i].date,
          slug: postData.data[i].slug,
          category: postData.data[i].category_name,
          tags: postData.data[i].tags_data,
          preview: postData.data[i].content,
        };

        formatData.push(data);
      }

      return {
        postData: formatData,
        totalPost: postData.total,
        currentPage: pages,
      };
    } catch (e) {
      //error({ statusCode: 404, message: 'Post not found' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

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
  font-size: 18px;

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
</style>
