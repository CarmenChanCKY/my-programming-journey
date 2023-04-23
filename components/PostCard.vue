<template>
  <div class="post-card">
    <NuxtLink :to="`/post/${postData.slug}`">
      <div class="post-card-title">
        {{ postData.title }}
      </div>
    </NuxtLink>
    <div class="post-card-info">
      <div class="post-date">
        <v-icon>{{ dataIcon }}</v-icon>
        <div>{{ postData.date }}</div>
      </div>
      <div class="post-category">
        <v-icon>{{ categoryIcon }}</v-icon>
        <div>{{ postData.category }}</div>
      </div>
    </div>
    <div class="post-tag-container">
      <v-icon>{{ tagIcon }}</v-icon>
      <div v-for="tag of postData.tags" :key="tag.id" class="post-card-tag">
        {{ tag.name }}
      </div>
    </div>
    <div class="post-preview">
      {{ postData.preview }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { mdiTagOutline, mdiCalendar, mdiFolderOutline } from "@mdi/js";

@Component
export default class PostCard extends Vue {
  @Prop({ type: Object, required: true, default: () => {} }) postData!: any;

  tagIcon: string = mdiTagOutline;
  dataIcon: string = mdiCalendar;
  categoryIcon: string = mdiFolderOutline;
  // TODO: link for category and tags
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

.post-card-info {
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

.post-tag-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  & > .post-card-tag {
    @extend %post-card-tag;
    margin-top: 5px;
    margin-bottom: 5px;

    &:hover {
      @extend %post-card-tag-hover;
    }
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
}

.v-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

@media screen and (max-width: $breakpoint-sm) {
  /* .post-preview {
    text-align: left;
  } */
}
</style>
