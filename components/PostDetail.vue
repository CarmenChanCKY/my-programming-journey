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
        <NuxtLink
          class="post-category"
          :to="{
            name: 'SearchCategoryResult',
            params: { keyword: postData.category },
          }"
        >
          <v-icon>{{ categoryIcon }}</v-icon>
          <div>{{ postData.category }}</div>
        </NuxtLink>
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
        :to="
          $validator.isValid(nextPost)
            ? { name: 'PostDetail', params: { slug: nextPost?.slug } }
            : {}
        "
      >
        <v-icon large class="ml-0 mr-2">{{ leftIcon }}</v-icon>
        {{ nextPost !== null ? nextPost.title : "" }}
      </NuxtLink>

      <NuxtLink
        class="previous-btn"
        :style="{
          visibility: $validator.isValid(previousPost) ? 'visible' : 'hidden',
        }"
        :to="
          $validator.isValid(previousPost)
            ? { name: 'PostDetail', params: { slug: previousPost?.slug } }
            : {}
        "
      >
        {{ previousPost !== null ? previousPost.title : "" }}
        <v-icon large class="mr-0 ml-2">{{ rightIcon }}</v-icon>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import {
  mdiTagOutline,
  mdiCalendar,
  mdiFolderOutline,
  mdiArrowLeft,
  mdiArrowRight,
} from "@mdi/js";
import type PostDetailInterface from "~/interfaces/PostDetailInterface";
import type OtherPostInterface from "~/interfaces/OtherPostInterface";
import Prism from "~/plugins/prism";

@Component
export default class PostDetail extends Vue {
  @Prop({ type: Object, required: true }) postData!: PostDetailInterface;
  @Prop({ type: String, required: true, default: "" }) content!: string;
  @Prop({ required: true, default: null })
  previousPost!: OtherPostInterface | null;
  @Prop({ required: true, default: null }) nextPost!: OtherPostInterface | null;

  // data
  tagIcon: string = mdiTagOutline;
  dateIcon: string = mdiCalendar;
  leftIcon: string = mdiArrowLeft;
  rightIcon: string = mdiArrowRight;
  categoryIcon: string = mdiFolderOutline;

  @Watch("content")
  highlightPrism(val: string) {
    if (this.$validator.isValid(val)) {
      setTimeout(() => {
        Prism.highlightAll();
      }, 300);
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