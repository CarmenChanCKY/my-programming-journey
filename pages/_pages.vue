<template>
  <PostPage
    :postData="postData"
    :currentPage="currentPage"
    :totalPost="totalPost"
  ></PostPage>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PostPage from "~/components/PostPage.vue";
@Component({
  components: {
    PostPage,
  },
  meta: { fullHeader: true },
})
export default class Index extends Vue {
  // data
  postData = [];
  currentPage: number = 1;
  totalPost: number = 0;

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
