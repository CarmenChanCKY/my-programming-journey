<template>
  <section class="category-container">
    <div class="page-title">Category</div>

    <template
      v-if="
        isValid(categoryData?.categoryList) && isValid(categoryData?.postList)
      "
    >
      <section class="category-group-container">
        <a
          v-for="(category, index) in categoryData?.categoryList"
          :key="index"
          @click="scrollTo(category.category_name)"
        >
          {{ category.category_name }} ({{ category.post_count }})
        </a>
      </section>

      <TitleList :listItem="categoryData?.postList ?? []"></TitleList>
    </template>
    <div class="not-found-container" v-else>
      <div>Category not Found</div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useAPI } from "~/composables/useAPI";
import type TitleListInterface from "~/interfaces/TitleListInterface.ts";

if (import.meta.client) {
  useHead({
    title: "Category",
    meta: [{ name: "og:url", content: window.location.href }],
  });
}

const { isValid } = useValidator();

const {
  data: categoryData,
  status,
  error,
} = await useAPI<{
  categoryList: Array<{ category_name: string; post_count: number }>;
  postList: Array<TitleListInterface>;
}>("/categories/all", { method: "GET" });

if (status.value === "error" && error.value != null) {
  throw createError(errorFormatter(error.value));
}

function scrollTo(el: string) {
  let element = document.getElementById(el);
  if (element) {
    window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
  }
}
</script>

<style lang="scss" scoped>
@use "~/assets/styles/global.scss" as *;

.category-container {
  @extend %center-div;
}

.category-group-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > a {
    margin-right: 20px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    background-color: rgb(var(--v-theme-categoryChip));
    color: rgb(var(--v-theme-accent));
    font-size: 0.889rem;
  }
}
</style>
