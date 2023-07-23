<template>
  <div class="post-empty">
    <div class="not-found-text">404 Search Not Found</div>
    <div
      class="description-text"
      v-if="
        descriptionText !== undefined &&
        descriptionText !== null &&
        descriptionText !== ''
      "
    >
      {{ descriptionText }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SearchEmpty extends Vue {
  @Prop({ required: false, default: "", type: String })
  descriptionText!: string;
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

.post-empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 5%;
}

.not-found-text {
  @extend %heading-font;
  text-align: center;
  font-size: 2.667rem;
}

.description-text {
  text-align: center;
  font-size: 1.222rem;
  padding-top: 5%;
  color: var(--v-searchResultText-base);
}

@media screen and (max-width: $breakpoint-sm) {
  .not-found-text {
    font-size: 2rem;
  }

  .description-text {
    font-size: 1.111rem;
  }
}

@media screen and (max-width: 449.9px) {
  .not-found-text {
    font-size: 1.556rem;
  }

  .description-text {
    font-size: 1rem;
  }
}
</style>
