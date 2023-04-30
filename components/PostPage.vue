<template>
  <div>
    <section class="post-card-container">
      <PostCard
        v-for="(data, index) of postData"
        :key="index"
        :post-data="data"
      ></PostCard>
    </section>
    <section class="pagination-container" v-if="!isNaN(currentPage)">
      <div>
        <NuxtLink
          class="prev-btn"
          :to="`/${parseInt(currentPage.toString()) - 1}`"
          :style="{ visibility: showPreviousBtn ? 'visible' : 'hidden' }"
        >
          <div class="pagination">
            <v-icon>{{ leftIcon }}</v-icon>
            Previous
          </div>
        </NuxtLink>
        <div class="current-pages">{{ currentPage }} / {{ totalPage }}</div>
        <NuxtLink
          class="next-btn"
          :to="`/${parseInt(currentPage.toString()) + 1}`"
          :style="{ visibility: showNextBtn ? 'visible' : 'hidden' }"
        >
          <div class="pagination">
            Next
            <v-icon>{{ rightIcon }}</v-icon>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PostCard from "~/components/PostCard.vue";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import type PostPageInterface from "~/interfaces/PostPageInterface";

@Component({
  components: {
    PostCard,
  },
})
export default class PostPage extends Vue {
  @Prop({ type: Array, default: () => [], required: true })
  postData!: Array<PostPageInterface>;
  @Prop({ type: Number, default: 1, required: true }) currentPage!: number;
  @Prop({ type: Number, default: 0, required: true }) totalPost!: number;

  // data
  leftIcon: string = mdiChevronLeft;
  rightIcon: string = mdiChevronRight;

  limit: number = 10;

  get totalPage(): number {
    return Math.ceil(this.totalPost / this.limit);
  }

  // computed
  get showPreviousBtn() {
    return this.currentPage >= 2;
  }

  get showNextBtn() {
    return this.postData.length === this.limit;
  }
}
</script>


<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

.post-card-container,
.pagination-container {
  @extend %center-div;
}

.pagination-container {
  margin-top: 30px;
  margin-bottom: 30px;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.pagination {
  @extend %button;
  font-size: 18px;

  &:hover {
    @extend %button-hover;

    & .v-icon {
      color: var(--v-primary-base);
    }
  }
}

.current-pages {
  color: var(--v-secondary-base);
}
</style>
