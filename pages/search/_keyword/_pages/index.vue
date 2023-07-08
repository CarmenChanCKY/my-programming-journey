<template>
  <div>
    <template v-if="totalPost !== 0">
      <div class="post-type">
        Search Result: {{ $route.params.keyword.replaceAll("-", " ") }}
      </div>
      <PostPage
        :postData="postData"
        :currentPage="currentPage"
        :totalPost="totalPost"
      ></PostPage>
    </template>
    <SearchEmpty v-else></SearchEmpty>
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
export default class SearchIndex extends Vue {
  // data
  postData: Array<PostPageInterface> = [];
  currentPage: number | string = 1;
  totalPost: number = 0;

  async fetch() {
    try {
      let keyword: string = "";
      let pages: number = 1;

      if (this.$route.params.keyword !== undefined) {
        keyword = this.$route.params.keyword.replaceAll("-", " ");
      } else {
        this.$nuxt.error({ statusCode: 404, message: "Search not found" });
      }

      if (this.$route.params.pages !== undefined) {
        if (isNaN(parseInt(this.$route.params.pages))) {
          this.$nuxt.error({ statusCode: 404, message: "Search not found" });
          return;
        }

        pages = parseInt(this.$route.params.pages);
      }

      const postData = await this.$axios.$get("/explore/post", {
        params: { keyword, pages },
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
}
</script>
