<template>
  <div>
    <section class="post-container">
      <div>
        <section class="post-header-container">
          <div class="post-title">
            {{ postData.title }}
          </div>
          <div class="post-info">
            <div class="post-date">
              <v-icon>{{ dateIcon }}</v-icon>
              <div>{{ postData.date }}</div>
            </div>
            <div class="post-category">
              <v-icon>{{ categoryIcon }}</v-icon>
              <div>{{ postData.category }}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center">
            <v-icon>{{ tagIcon }}</v-icon>
            <div
              v-for="(tag, index) of postData.tags"
              :key="index"
              class="post-tag"
            >
              {{ tag.name }}
            </div>
          </div>
        </section>

        <section class="post-content" v-html="content"></section>

        <section class="post-reference" v-if="postData.reference.length > 0">
          <p class="ref-heading">Reference</p>
          <ul class="ref-ul">
            <li v-for="(reference, index) of postData.reference" :key="index">
              <a :href="reference.hyperlink">{{ reference.name }}</a>
            </li>
          </ul>
        </section>

        <!-- TODO: previous post, next post -->
      </div>
    </section>
  </div>
</template>
  
  <script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mdiTagOutline, mdiCalendar, mdiFolderOutline } from "@mdi/js";
import type PostDetailInterface from "~/interfaces/PostDetailInterface";
import OtherPostInterface from "~/interfaces/OtherPostInterface";

@Component({ watchQuery: ["page"], meta: { fullHeader: false } })
export default class Post extends Vue {
  // data
  tagIcon: string = mdiTagOutline;
  dateIcon: string = mdiCalendar;
  categoryIcon: string = mdiFolderOutline;
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


<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

.post-container {
  @extend %center-div;
}

.post-header-container {
  border-bottom: 2px dashed #939393;
  margin-top: 30px;
  margin-bottom: 40px;
  padding-bottom: 20px;
}

.post-title {
  @extend %post-title;
  margin-bottom: 20px;
}

.post-info {
  @extend %post-info;
}

.post-date {
  @extend %button;
}

.post-category {
  @extend %button;

  &:hover {
    @extend %button-hover;
  }
}

.post-tag {
  @extend %post-card-tag;
  margin-top: 5px;
  margin-bottom: 5px;

  &:hover {
    @extend %post-card-tag-hover;
  }
}

.post-reference {
  .ref-heading {
  }

  .ref-ul {
  }
}

.v-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>