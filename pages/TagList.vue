<template>
  <section class="tags-container">
    <div class="page-title">Tags</div>

    <div class="tags-list">
      <div v-for="tag in tagsList" :key="tag.id">
        <NuxtLink
          :to="{ name: 'SearchTagResult', params: { keyword: tag.name } }"
        >
          {{ tag.name }} ({{ tag.post_count }})
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  async asyncData(context) {
    try {
      const tags = await context.$axios.$get("/tag/all");

      return {
        tagsList: tags.data,
      };
    } catch (e) {
      //throw ({ statusCode: 404, message: "Post not found" });
    }
  },
})
export default class TagList extends Vue {
  tagsList: Array<Tags> = [];
}

interface Tags {
  id: number;
  name: string;
  post_count: number;
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

.tags-container {
  @extend %center-div;
}

.tags-list {
  margin-bottom: 30px;

  & > div {
    padding-left: 15px;
    border-left: 2px solid var(--v-dividerBorderLine-base);
    line-height: 2.3;

    &:hover {
      border-left: 2px solid var(--v-primary-lighten2);

      & > a {
        color: var(--v-primary-lighten2);
      }
    }
  }
}
</style>
