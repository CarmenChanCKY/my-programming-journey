<template>
  <div>
    <template v-if="totalPost !== 0">
      <div class="post-type">
        {{ resultText }}: {{ $route.params.keyword.replaceAll("-", " ") }}
      </div>
      <PostPage
        :postData="postData"
        :currentPage="currentPage"
        :totalPost="totalPost"
        :pageType="$route.meta?.source"
      ></PostPage>
    </template>
    <SearchEmpty v-else :descriptionText="searchNotFoundText"></SearchEmpty>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PostPage from "~/components/PostPage.vue";
import SearchEmpty from "~/components/SearchEmpty.vue";
import PostPageInterface from "~/interfaces/PostPageInterface";

@Component({
  components: {
    PostPage,
    SearchEmpty,
  },
})
export default class SearchResult extends Vue {
  // data
  postData: Array<PostPageInterface> = [];
  currentPage: number | string = 1;
  totalPost: number = 0;
  searchNotFoundText: string = "";
  resultText: string = "";
  errorMessage: string = "";

  async fetch() {
    try {
      let keyword: string = "";
      let pages: number = 1;

      if (this.$route.params.keyword !== undefined) {
        keyword = this.$route.params.keyword.replaceAll("-", " ");
      } else {
        this.$nuxt.error({ statusCode: 404, message: this.errorMessage });
      }

      if (this.$route.params.pages !== undefined) {
        if (isNaN(parseInt(this.$route.params.pages))) {
          this.$nuxt.error({ statusCode: 404, message: this.errorMessage });
          return;
        }

        pages = parseInt(this.$route.params.pages);
      }

      let key = "";
      let params: any = { pages };
      if (this.$route.meta?.source === "search") {
        key = "/explore/post";
        params = { ...params, keyword };
      } else if (this.$route.meta?.source === "category") {
        key = "/categories/list";
        params = { ...params, category: keyword };
      }

      const postData = await this.$axios.$get(key, { params });

      const formatData: any = [];

      for (let i = 0; i < postData.data.length; i++) {
        const data = {
          title: postData.data[i].title,
          date: postData.data[i].date,
          slug: postData.data[i].slug,
          category: postData.data[i].category_name,
          category_id: postData.data[i].category_id,
          tags: postData.data[i].tags_data,
          preview: postData.data[i].content,
        };

        formatData.push(data);
      }

      this.postData = formatData;
      this.totalPost = postData.total;
      this.currentPage = pages;
    } catch (e) {
      //this.$nuxt.error({ statusCode: 404, message: "Post not found" });
    }
  }

  mounted() {
    const keyword = this.$route.params.keyword.replaceAll("-", " ");

    if (this.$route.meta?.source === "search") {
      this.resultText = "Search Result";
      this.errorMessage = "Search not found";
      this.searchNotFoundText = `Search result for ${keyword} not found.`;
    } else if (this.$route.meta?.source === "category") {
      this.resultText = "Category";
      this.errorMessage = "Category not found";
      this.searchNotFoundText = `Category ${keyword} not found.`;
    }
  }
}
</script>