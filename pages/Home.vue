<template>
  <PostPage
    :postData="postData"
    :totalPost="totalPost"
    :pageType="'post'"
  ></PostPage>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PostPage from "~/components/PostPage.vue";
import PostPageInterface from "~/interfaces/PostPageInterface";

@Component({
  components: {
    PostPage,
  },
})
export default class Home extends Vue {
  // data
  postData: Array<PostPageInterface> = [];
  totalPost: number = 0;

  async fetch() {
    try {
      let pages: number = 1;
      if (this.$route.params.pages !== undefined) {
        if (isNaN(parseInt(this.$route.params.pages))) {
          this.$nuxt.error({ statusCode: 404, message: "Post not found" });
          return;
        }

        pages = parseInt(this.$route.params.pages);
      }

      const postData = await this.$axios.$get("/post/list", {
        params: { pages },
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
    } catch (e) {
      //this.$nuxt.error({ statusCode: 404, message: "Post not found" });
    }
  }
}
</script>
