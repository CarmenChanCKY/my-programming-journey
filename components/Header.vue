<template>
  <header :class="headerClass">
    <NuxtLink class="main-title-link" :to="{ name: 'Home' }">
      <div v-if="headerClass === 'full'" class="website-title">
        My Programming Journey
      </div>
      <div v-else class="simple-website-title">
        My Programming <span>Journey</span>
      </div>
    </NuxtLink>

    <div
      :class="{ hamburger: true, active: toggleMenu }"
      v-if="headerClass === 'simple'"
      @click="toggleMenu = !toggleMenu"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>

    <v-overlay v-if="toggleMenu" z-index="90" absolute></v-overlay>

    <div :class="{ 'nav-link': true, active: toggleMenu }">
      <div class="nav-close-btn" v-if="headerClass === 'simple'">
        <v-btn icon large @click="toggleMenu = false">
          <v-icon large>{{ mdiClose }}</v-icon>
        </v-btn>
      </div>
      <NuxtLink :to="{ name: 'Home' }" v-if="headerClass === 'simple'">
        <div>Home</div>
      </NuxtLink>
      <NuxtLink :to="{ name: 'CategoryList' }">
        <div>Category</div>
      </NuxtLink>
      <NuxtLink :to="{ name: 'TagList' }">
        <div>Tags</div>
      </NuxtLink>
      <NuxtLink :to="{ name: 'Archive' }">
        <div>Archive</div>
      </NuxtLink>
      <ChangeTheme></ChangeTheme>
      <SearchBar :currentHeaderType="headerClass"></SearchBar>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import ChangeTheme from "~/components/ChangeTheme.vue";
import SearchBar from "~/components/SearchBar.vue";
import Logo from "~/components/Logo.vue";
import { mdiClose } from "@mdi/js";

@Component({ components: { ChangeTheme, SearchBar, Logo } })
export default class Header extends Vue {
  mdiClose: string = mdiClose;

  headerClass: string = "full";
  toggleMenu: boolean = false;

  get isFullHeader() {
    return this.$store.getters["persistent/isFullHeader"];
  }

  @Watch("$vuetify.breakpoint.width")
  updateWidth(width: number) {
    this.changeResponsiveHeader(width);
  }

  @Watch("isFullHeader", { immediate: true })
  updateHeader() {
    if (!this.isFullHeader) {
      this.headerClass = "simple";
    } else {
      this.headerClass = "full";
      this.changeResponsiveHeader(window.innerWidth);
    }
  }

  changeResponsiveHeader(width: number) {
    if (this.isFullHeader) {
      if (width < 520) {
        this.headerClass = "simple";
      } else {
        this.toggleMenu = false;
        this.headerClass = "full";
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

%disable-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

header {
  &.full {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px 0;

    .website-title {
      @extend %main-title-font;
      @extend %disable-select;
      font-size: 2.667rem;
      margin-bottom: 20px;
      font-weight: bold;
      color: var(--v-colorText-base);
      text-align: center;
    }

    .nav-link {
      width: 475px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & div:not(.search-btn-container) {
        @extend %main-title-font;
        font-size: 1.111rem;
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
  }

  &.simple {
    @extend %center-div;
    display: flex;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 50px;
    justify-content: space-between;

    .simple-website-title {
      @extend %main-title-font;
      @extend %disable-select;
      position: relative;
      font-size: 1.778rem;
      letter-spacing: 0.8px;
      font-weight: bold;
      color: var(--v-primary-base);

      & > span {
        @extend %main-title-font;
        position: absolute;
        font-size: 1.556rem;
        top: 32px;
        right: 24px;
      }
    }

    .nav-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 99;
      opacity: 0;
      position: fixed;
      height: 100%;
      top: 0;
      right: 0;
      padding: 35px 20px 15px 20px;
      transform: translateX(350px);
      width: 350px;

      -webkit-transition: transform 0.3s ease-in-out,
        background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
      -moz-transition: transform 0.3s ease-in-out,
        background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
      -ms-transition: transform 0.3s ease-in-out,
        background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
      -o-transition: transform 0.3s ease-in-out,
        background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
      transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out,
        opacity 0.3s ease-in-out;

      &.active {
        opacity: 1;
        background-color: var(--v-drawerBackground-base);
        overflow-x: hidden;
        transform: translateX(0);
      }

      .nav-close-btn {
        align-self: flex-end;
        margin-bottom: 35px;
      }

      & a {
        margin-bottom: 35px;

        & > div {
          @extend %main-title-font;
          font-size: 1.111rem;
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
    }
  }
}

.hamburger {
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }

  & > span {
    background-color: var(--v-colorText-base);
    width: 30px;
    display: inline-block;
    height: 3px;
    margin-bottom: 5px;
    opacity: 1;

    &:first-child {
      transform-origin: 0px 0px;
    }

    &:last-child {
      transform-origin: 0px 0px;
    }
  }
}

@media screen and (max-width: $breakpoint-sm) {
  header {
    &.full {
      .website-title {
        font-size: 2.222rem;
      }

      .nav-link {
        width: 450px;
      }
    }
  }
}

@media screen and (max-width: $breakpoint-xs) {
  header {
    &.simple {
      .nav-link {
        transform: translateX(100%);
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  header {
    &.simple {
      flex-direction: column-reverse;
      row-gap: 20px;
      margin-bottom: 10px !important;

      & .hamburger {
        align-self: flex-end;
      }

      & .main-title-link {
        max-width: 90%;

        .simple-website-title {
          font-size: 1.333rem;
          text-align: center;

          & > span {
            position: relative;
            top: 0;
            right: 0;
            font-size: 1.333rem;
          }
        }
      }
    }
  }
}
</style>
