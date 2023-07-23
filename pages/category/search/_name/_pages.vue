<template>
  <div>
    <template v-if="totalPost !== 0">
      <div class="post-type">Category: {{ $route.params.name }}</div>
      <PostPage
        :postData="postData"
        :currentPage="currentPage"
        :totalPost="totalPost"
        :pageType="`category`"
      ></PostPage>
    </template>
    <SearchEmpty v-else :descriptionText="categoryNotFoundText"></SearchEmpty>
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
  meta: { fullHeader: false },
})
export default class CategoryPages extends Vue {
  // data
  postData: Array<PostPageInterface> = [];
  currentPage: number | string = 1;
  totalPost: number = 0;
  categoryNotFoundText: string = "";

  async fetch() {
    try {
      let category: string = "";
      let pages: number = 1;

      if (this.$route.params.name !== undefined) {
        category = this.$route.params.name;
      } else {
        this.$nuxt.error({ statusCode: 404, message: "Category not found" });
      }

      if (this.$route.params.pages !== undefined) {
        if (isNaN(parseInt(this.$route.params.pages))) {
          this.$nuxt.error({ statusCode: 404, message: "Category not found" });
          return;
        }

        pages = parseInt(this.$route.params.pages);
      }

      const postData = await this.$axios.$get("/categories/list", {
        params: { category, pages },
      });

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
    this.categoryNotFoundText = `Category ${this.$route.params.name} not found.`;
  }
}
</script>