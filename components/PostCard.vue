<template>
  <div class="post-card">
    <NuxtLink :to="postRouter">
      <div class="post-card-title">
        {{ postData.title }}
      </div>
    </NuxtLink>
    <div class="post-info">
      <div class="post-date">
        <v-icon>{{ dataIcon }}</v-icon>
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

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { mdiTagOutline, mdiCalendar, mdiFolderOutline } from "@mdi/js";
import type PostPageInterface from "~/interfaces/PostPageInterface";
import type RouterLinkInterface from "~/interfaces/RouterLinkInterface";

@Component
export default class PostCard extends Vue {
  @Prop({ type: Object, required: true, default: () => {} })
  postData!: PostPageInterface;
  @Prop({ type: Object, default: () => {}, required: true })
  postRouter!: RouterLinkInterface;

  tagIcon: string = mdiTagOutline;
  dataIcon: string = mdiCalendar;
  categoryIcon: string = mdiFolderOutline;
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/global.scss";

.post-card {
  padding: 2.778rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--v-dividerBorderLine-base);
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
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-align: justify;
  word-break: break-all;
  letter-spacing: 0.2px;
}

.v-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
