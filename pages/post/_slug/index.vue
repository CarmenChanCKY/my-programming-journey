<template>
  <PostDetail
    :postData="postData"
    :content="content"
    :previousPost="previousPost"
    :nextPost="nextPost"
  ></PostDetail>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PostDetail from "~/components/PostDetail.vue";
import type PostDetailInterface from "~/interfaces/PostDetailInterface";
import type OtherPostInterface from "~/interfaces/OtherPostInterface";

@Component({
  components: { PostDetail },
  watchQuery: ["page"],
  meta: { fullHeader: false },
})
export default class Post extends Vue {
  // data
  postData: PostDetailInterface = {
    id: -1,
    slug: "",
    title: "",
    date: "",
    category: "",
    category_id: -1,
    tags: [],
    reference: [],
  };
  previousPost: OtherPostInterface | null = null;
  nextPost: OtherPostInterface | null = null;
  content: string = "";

  async fetch() {
    try {
      // get post data
      let slug = "";
      if (this.$route.params.slug !== undefined) {
        slug = this.$route.params.slug;
      }

      const postDetail = await this.$axios.$get("/post/detail", {
        params: { slug },
      });

      this.postData = {
        id: postDetail.id,
        slug: this.$route.params.slug,
        title: postDetail.title,
        date: postDetail.date,
        category: postDetail.category_name,
        category_id: postDetail.category_id,
        tags: postDetail.tags_data,
        reference:
          postDetail.reference_array !== undefined &&
          Array.isArray(postDetail.reference_array)
            ? postDetail.reference_array
            : [],
      };

      this.content = postDetail.content;

      // get previous post
      const previousPost = await this.$axios.$get("/post/previous", {
        params: { id: postDetail.id },
      });

      if (Object.keys(previousPost).length > 0) {
        this.previousPost = previousPost;
      } else {
        this.previousPost = null;
      }

      // get next post
      const nextPost = await this.$axios.$get("/post/next", {
        params: { id: postDetail.id },
      });

      if (Object.keys(nextPost).length > 0) {
        this.nextPost = nextPost;
      } else {
        this.nextPost = null;
      }
    } catch (e) {
      //this.$nuxt.error({ statusCode: 404, message: "Post not found" });
    }
  }
}
</script>