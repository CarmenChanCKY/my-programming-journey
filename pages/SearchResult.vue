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
  async asyncData(context) {
    try {
      const source: string =
        context.route.meta !== undefined ? context.route.meta[0].source : "";
      let keyword: string = context.route.params.keyword;
      let pages: number = 1;

      let resultText = "";
      let errorMessage = "";
      let searchNotFoundText = "";
      let key = "";

      if (source === "search") {
        errorMessage = "Search not found";
      } else if (source === "category") {
        errorMessage = "Category not found";
      } else {
        context.error({ statusCode: 404, message: "Page Not Found" });
      }

      if (this.$validator.isValid(keyword)) {
        keyword = context.route.params.keyword.replaceAll("-", " ");
      } else {
        context.error({ statusCode: 404, message: errorMessage });
        return;
      }

      if (context.route.params.pages !== undefined) {
        if (isNaN(parseInt(context.route.params.pages))) {
          context.error({ statusCode: 404, message: errorMessage });
          return;
        }

        pages = parseInt(context.route.params.pages);
      }

      let params: any = { pages };
      if (source === "search") {
        resultText = "Search Result";
        searchNotFoundText = `Search result for ${keyword} not found.`;
        key = "/explore/post";
        params = { ...params, keyword };
      } else if (source === "category") {
        resultText = "Category";
        searchNotFoundText = `Category ${keyword} not found.`;
        key = "/categories/list";
        params = { ...params, category: keyword };
      }

      const postData: any = await context.$axios.$get(key, { params });

      const formatData: any = [];

      if (this.$validator.isValid(postData.data)) {
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
      }
      return {
        postData: formatData,
        totalPost: this.$validator.isValid(postData.total) ? postData.total : 0,
        currentPage: pages,
        searchNotFoundText,
        resultText,
      };
    } catch (e) {
      //this.$nuxt.error({ statusCode: 404, message: "Post not found" });
    }
  },
})
export default class SearchResult extends Vue {
  // data
  postData: Array<PostPageInterface> = [];
  currentPage: number | string = 1;
  totalPost: number = 0;
  searchNotFoundText: string = "";
  resultText: string = "";

  /*  async fetch() {
    try {
      let keyword: string = "";
      let pages: number = 1;

      if (context.route.params.keyword !== undefined) {
        keyword = context.route.params.keyword.replaceAll("-", " ");
      } else {
        this.$nuxt.error({ statusCode: 404, message: this.errorMessage });
      }

      if (context.route.params.pages !== undefined) {
        if (isNaN(parseInt(context.route.params.pages))) {
          this.$nuxt.error({ statusCode: 404, message: this.errorMessage });
          return;
        }

        pages = parseInt(context.route.params.pages);
      }

      let key = "";
      let params: any = { pages };
      if (context.route.meta?.source === "search") {
        key = "/explore/post";
        params = { ...params, keyword };
      } else if (context.route.meta?.source === "category") {
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
  } */

  mounted() {
    /*  const keyword = context.route.params.keyword.replaceAll("-", " ");

    if (context.route.meta?.source === "search") {
      this.resultText = "Search Result";
      this.errorMessage = "Search not found";
      this.searchNotFoundText = `Search result for ${keyword} not found.`;
    } else if (context.route.meta?.source === "category") {
      this.resultText = "Category";
      this.errorMessage = "Category not found";
      this.searchNotFoundText = `Category ${keyword} not found.`;
    } */
  }
}
</script>
