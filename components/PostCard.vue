<template>
  <div class="post-card">
    <NuxtLink :to="postRouter">
      <div class="post-card-title">
        {{ postData.title }}
      </div>
    </NuxtLink>
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
        v-for="tag of postData.tags"
        :key="tag.id"
        class="post-tag"
        :to="{ name: 'SearchTagResult', params: { keyword: tag.name } }"
      >
        {{ tag.name }}
      </NuxtLink>
    </div>
    <div class="post-preview">
      {{ postData.preview }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type PostPageInterface from "~/interfaces/PostPageInterface";

interface PostPageProps {
  postData: PostPageInterface;
  postRouter: {
    name: string;
    params?: { pages?: number; slug?: string; keyword?: string };
  };
}

// props
const props = defineProps<PostPageProps>();
</script>

<style lang="scss" scoped>
@use "~/assets/styles/global.scss" as *;

.post-card {
  padding: 2.778rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgb(var(--v-theme-dividerBorderLine));
  }

  &:last-child {
    margin-bottom: 20px;
  }
}

.post-card-title {
  @extend %post-title;
  width: fit-content;
  margin-bottom: 20px;

  &:hover {
    cursor: pointer;
  }
}

.post-preview {
  line-height: 2;
  margin-top: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-align: justify;
  word-break: break-all;
  letter-spacing: 0.1px;
}

.v-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
