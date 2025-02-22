<template>
  <section class="tags-container">
    <div class="page-title">Tags</div>
    <template v-if="$validator.isValid(tagsList)">
      <div class="tags-list">
        <div v-for="tag in tagsList" :key="tag.id">
          <NuxtLink
            :to="{ name: 'SearchTagResult', params: { keyword: tag.name } }"
          >
            {{ tag.name }} ({{ tag.post_count }})
          </NuxtLink>
        </div>
      </div>
    </template>
    <div class="not-found-container" v-else>
      <div>Tags not Found</div>
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
    } catch (e) {}
  },
})
export default class TagList extends Vue {
  tagsList: Array<Tags> = [];

  head() {
    return {
      title: "Tags",
      meta: [{ hid: "og_url", name: "og:url", content: window.location.href }],
    };
  }
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
      border-left: 2px solid var(--v-primaryHover-base);

      & > a {
        color: var(--v-primaryHover-base);
      }
    }
  }
}
</style>
