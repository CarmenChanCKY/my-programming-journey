<template #header>
  <header>
    <div class="website-title">My Programming Journey</div>

    <div class="nav-link">
      <NuxtLink to="/">
        <div>Home</div>
      </NuxtLink>
      <!-- <div>About</div> -->
      <div>Category</div>
      <div>Tags</div>
      <div>Archive</div>
      <ChangeTheme />
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ChangeTheme from "~/components/ChangeTheme.vue";

@Component({ components: { ChangeTheme } })
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
}

.website-title {
  @extend %main-title-font;
  font-size: 2.667rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.nav-link {
  width: 475px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div {
    @extend %main-title-font;
    font-size: 20px;
    color: var(--v-primary-base);

    &:hover {
      cursor: pointer;
      &::after {
        @extend %link-hover-animation;
      }
    }

    &::after {
      @extend %link;
    }
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .website-title {
    font-size: 2.222rem;
  }

  .nav-link {
    width: 450px;
  }
}
</style>
