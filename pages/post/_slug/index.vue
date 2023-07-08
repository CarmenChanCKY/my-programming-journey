<template>
  <section class="post-container">
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
      <div class="post-tag-container">
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
          <a :href="reference.hyperlink" target="_blank">{{
            reference.name
          }}</a>
        </li>
      </ul>
    </section>

    <div class="next-previous-container">
      <NuxtLink
        class="next-btn"
        :style="{
          visibility: $validator.isValid(nextPost) ? 'visible' : 'hidden',
        }"
        :to="`/post/${nextPost !== null ? nextPost.slug : ''}`"
      >
        <v-icon large class="ml-0 mr-2">{{ leftIcon }}</v-icon>
        {{ nextPost !== null ? nextPost.title : "" }}
      </NuxtLink>

      <NuxtLink
        class="previous-btn"
        :style="{
          visibility: $validator.isValid(previousPost) ? 'visible' : 'hidden',
        }"
        :to="`/post/${previousPost !== null ? previousPost.slug : ''}`"
      >
        {{ previousPost !== null ? previousPost.title : "" }}
        <v-icon large class="mr-0 ml-2">{{ rightIcon }}</v-icon>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {
  mdiTagOutline,
  mdiCalendar,
  mdiFolderOutline,
  mdiArrowLeft,
  mdiArrowRight,
} from "@mdi/js";
import type PostDetailInterface from "~/interfaces/PostDetailInterface";
import OtherPostInterface from "~/interfaces/OtherPostInterface";
import Prism from "~/plugins/prism";

@Component({ watchQuery: ["page"], meta: { fullHeader: false } })
export default class Post extends Vue {
  // data
  tagIcon: string = mdiTagOutline;
  dateIcon: string = mdiCalendar;
  leftIcon: string = mdiArrowLeft;
  rightIcon: string = mdiArrowRight;
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

      Prism.highlightAll();
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

.post-reference {
  margin-top: 50px;
  .ref-heading {
    font-weight: bold;
    font-size: 1.333rem;
    margin-bottom: 5px !important;
  }

  .ref-ul {
    padding-left: 20px;

    & > li {
      padding-left: 5px;

      & > a:hover {
        border-bottom: 2px solid var(--v-primary-base);
      }
    }
  }
}

.next-previous-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 100px;
  margin-bottom: 40px;

  & > a {
    font-weight: bold;
    width: 45%;
    display: flex;
    align-items: center;
    @extend %button;

    &:hover {
      @extend %button-hover;

      & .v-icon {
        color: var(--v-primary-base);
      }
    }
  }

  & > .previous-btn {
    text-align: right;
  }
}

.v-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

@media screen and (max-width: $breakpoint-md) {
  .next-previous-container {
    flex-direction: column;

    & > a {
      width: 100%;
      align-items: flex-start;
      flex-direction: column;

      &:last-child {
        flex-direction: column-reverse;
        text-align: left;
        margin-top: 30px;

        & > .v-icon {
          margin-left: 0 !important;
        }
      }

      & > .v-icon {
        font-size: 1.556rem !important;
        width: 1.556rem !important;
        height: 1.556rem !important;
      }
    }
  }

  .next-previous-container {
    margin-top: 80px;
  }
}
</style>
