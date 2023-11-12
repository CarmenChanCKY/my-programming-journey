<template>
  <section class="archive-container">
    <div class="page-title">Archive</div>

    <TitleList :ListItem="postList"></TitleList>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import TitleList from "~/components/TitleList.vue";
import type TitleListInterface from "~/interfaces/TitleListInterface";

@Component({
  components: { TitleList },
  async asyncData(context) {
    try {
      const archiveData = await context.$axios.$get("/post/archive", {
        params: { pages: 9 },
      });

      const listItem = archiveData.data.map((obj: any) => {
        return {
          listTitle: obj.post_year_month,
          list: obj.post_list,
        };
      });

      return {
        postList: listItem,
        archiveTotal: archiveData.total,
      };
    } catch (e) {
      console.log(e);
    }
  },
})
export default class CategoryList extends Vue {
  postList: Array<TitleListInterface> = [];
  archiveTotal: number = 0;
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

.archive-container {
  @extend %center-div;
}
</style>
