<template>
  <div class="post-empty">
    <div class="not-found-text">404 Search Not Found</div>
    <div class="description-text" v-if="isValid(descriptionText)">
      {{ descriptionText }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const { isValid } = useValidator();

interface SearchEmptyProps {
  descriptionText: string;
}

// props
const props = withDefaults(defineProps<SearchEmptyProps>(), {
  descriptionText: "",
});
</script>

<style lang="scss" scoped>
@use "~/assets/styles/global.scss" as *;

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
  color: rgb(var(--v-theme-searchResultText));
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
