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
  async asyncData(context) {
    try {
      // get post data
      let slug = "";
      if (context.route.params.slug !== undefined) {
        slug = context.route.params.slug;
      }

      const getPostDetail = await context.$axios.$get("/post/detail", {
        params: { slug },
      });

      console.log(getPostDetail);

      const postData = {
        id: getPostDetail.id,
        slug: context.route.params.slug,
        title: getPostDetail.title,
        date: getPostDetail.date,
        category: getPostDetail.category_name,
        category_id: getPostDetail.category_id,
        tags: getPostDetail.tags_data,
        reference:
          getPostDetail.reference_array !== undefined &&
          Array.isArray(getPostDetail.reference_array)
            ? getPostDetail.reference_array
            : [],
      };

      const metaKeyword = getPostDetail.meta_keyword;
      const metaDescription =
        getPostDetail.meta_description !== undefined &&
        getPostDetail.meta_description !== null &&
        getPostDetail.meta_description !== ""
          ? getPostDetail.meta_description
          : "";

      const content = getPostDetail.content;

      // get previous post
      const getPreviousPost = await context.$axios.$get("/post/previous", {
        params: { id: getPostDetail.id },
      });

      let previousPost = null;
      if (Object.keys(getPreviousPost).length > 0) {
        previousPost = getPreviousPost;
      }

      // get next post
      const getNextPost = await context.$axios.$get("/post/next", {
        params: { id: getPostDetail.id },
      });

      let nextPost = null;
      if (Object.keys(getNextPost).length > 0) {
        nextPost = getNextPost;
      }

      return {
        postData,
        content,
        previousPost,
        nextPost,
        metaKeyword,
        metaDescription,
      };
    } catch (e: any) {}
  },
})
export default class PostContent extends Vue {
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
  metaKeyword: string = "";
  metaDescription = "";

  head() {
    const meta = [
      { hid: "og_url", name: "og:url", content: window.location.href },
      { hid: "keyword", name: "keyword", content: this.metaKeyword },
    ];

    if (this.$validator.isValid(this.metaDescription)) {
      meta.push({
        hid: "description",
        name: "description",
        content: this.metaDescription,
      });
      meta.push({
        hid: "og_description",
        name: "og:description",
        content: this.metaDescription,
      });
    }

    return {
      title: this.postData.title,
      meta,
    };
  }
}
</script>
