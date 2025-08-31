<template>
  <section class="post-container">
    <section class="post-header-container">
      <div class="post-title">
        {{ postData.title }}
      </div>
      <div class="post-info">
        <div class="post-date">
          <v-icon size="small" icon="mdi mdi-calendar"></v-icon>
          <div>{{ postData.date }}</div>
        </div>
        <NuxtLink
          class="post-category"
          :to="{
            name: 'SearchCategoryResult',
            params: { keyword: postData.category },
          }"
        >
          <v-icon size="small" icon="mdi mdi-folder-outline"></v-icon>
          <div>{{ postData.category }}</div>
        </NuxtLink>
      </div>
      <div class="post-tag-container">
        <v-icon size="small" icon="mdi mdi-tag-outline"></v-icon>
        <NuxtLink
          v-for="(tag, index) of postData.tags"
          :key="index"
          class="post-tag"
          :to="{
            name: 'SearchTagResult',
            params: { keyword: tag.name },
          }"
        >
          {{ tag.name }}
        </NuxtLink>
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
          visibility: isValid(nextPost) ? 'visible' : 'hidden',
        }"
        :to="
          isValid(nextPost)
            ? { name: 'PostDetail', params: { slug: nextPost?.slug } }
            : {}
        "
      >
        <v-icon size="large" class="ml-0 mr-2" icon="mdi mdi-arrow-left">
        </v-icon>
        {{ nextPost !== null ? nextPost.title : "" }}
      </NuxtLink>

      <NuxtLink
        class="previous-btn"
        :style="{
          visibility: isValid(previousPost) ? 'visible' : 'hidden',
        }"
        :to="
          isValid(previousPost)
            ? { name: 'PostDetail', params: { slug: previousPost?.slug } }
            : {}
        "
      >
        {{ previousPost !== null ? previousPost.title : "" }}
        <v-icon size="large" icon="mdi mdi-arrow-right"></v-icon>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type PostDetailInterface from "~/interfaces/PostDetailInterface";
import type OtherPostInterface from "~/interfaces/OtherPostInterface";
import Prism from "~/assets/prism";

const { isValid } = useValidator();

interface PostDetailProps {
  postData: PostDetailInterface;
  content: string;
  previousPost: OtherPostInterface | null;
  nextPost: OtherPostInterface | null;
}

// props
const props = defineProps<PostDetailProps>();

watch(
  () => props.content,
  function (newVal: string) {
    if (isValid(newVal)) {
      setTimeout(() => {
        Prism.highlightAll();
      }, 300);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
@use "~/assets/styles/global.scss" as *;

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
        border-bottom: 2px solid rgb(var(--v-theme-primary));
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
        color: rgb(var(--v-theme-primary));
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
