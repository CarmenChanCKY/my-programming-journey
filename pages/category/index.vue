<template>
  <section class="category-container">
    <div class="page-title">Category</div>

    <section class="category-group-container">
      <a
        v-for="(category, index) in categoryList"
        :key="index"
        @click="scrollTo(category.category_name)"
      >
        {{ category.category_name }} ({{ category.post_count }})
      </a>
    </section>

    <TitleList :ListItem="postList"></TitleList>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TitleList from "~/components/TitleList.vue";
import type TitleListInterface from "~/interfaces/TitleListInterface";

@Component({ components: { TitleList }, meta: { fullHeader: false } })
export default class Category extends Vue {
  categoryList: Array<any> = [];
  postList: Array<TitleListInterface> = [];

  async fetch() {
    try {
      const categoriesGroup = await this.$axios.$get("/categories/all");

      this.categoryList = categoriesGroup.categoryList;
      this.postList = categoriesGroup.postList;
    } catch (e) {
      //this.$nuxt.error({ statusCode: 404, message: "Post not found" });
    }
  }

  scrollTo(el: string) {
    let element = document.getElementById(el);
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

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
    background-color: var(--v-categoryChip-base);
    color: var(--v-secondary-base);
    font-size: 0.889rem;
  }
}

.category-list-container {
}
</style>
