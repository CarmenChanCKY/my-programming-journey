<template>
  <section class="tags-container">
    <div class="page-title">Tags</div>
    <template v-if="isValid(tagsList)">
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

<script lang="ts" setup>
import { useAPI } from "~/composables/useAPI";

interface Tags {
  id: number;
  name: string;
  post_count: number;
}

if (import.meta.client) {
  useHead({
    title: "Tags",
    meta: [{ name: "og:url", content: window.location.href }],
  });
}

const { isValid } = useValidator();

const {
  data: tagsList,
  status,
  error,
} = await useAPI<Array<Tags>>("/tag/all", {
  method: "GET",
  onResponse({ request, response, options }) {
    response._data = response._data.data;
  },
});

if (status.value === "error" && error.value != null) {
  throw createError(errorFormatter(error.value));
}
</script>

<style lang="scss" scoped>
@use "~/assets/styles/global.scss" as *;

.tags-container {
  @extend %center-div;
}

.tags-list {
  margin-bottom: 30px;

  & > div {
    padding-left: 15px;
    border-left: 2px solid rgb(var(--v-theme-dividerBorderLine));
    line-height: 2.3;

    &:hover {
      border-left: 2px solid rgb(var(--v-theme-primaryHover));

      & > a {
        color: rgb(var(--v-theme-primaryHover));
      }
    }
  }
}
</style>
