<template>
  <header :class="headerClass">
    <NuxtLink class="main-title-link" to="/">
      <div v-if="headerClass === 'full'" class="website-title">
        My Programming Journey
      </div>
      <Logo v-else></Logo>
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
      <NuxtLink to="/">
        <div>Home</div>
      </NuxtLink>
      <NuxtLink to="/">
        <div>Category</div>
      </NuxtLink>
      <NuxtLink to="/">
        <div>Tags</div>
      </NuxtLink>
      <NuxtLink to="/">
        <div>Archive</div>
      </NuxtLink>
      <ChangeTheme></ChangeTheme>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import ChangeTheme from "~/components/ChangeTheme.vue";
import Logo from "~/components/Logo.vue";
import { mdiClose } from "@mdi/js";

@Component({ components: { ChangeTheme, Logo } })
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

header {
  &.full {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px 0;

    .website-title {
      @extend %main-title-font;
      font-size: 2.667rem;
      margin-bottom: 20px;
      font-weight: bold;
      color: var(--v-colorText-base);
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
  }

  &.simple {
    @extend %center-div;
    display: flex;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
    justify-content: space-between;

    .main-title-link {
      width: 70%;
      max-width: 300px;
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
</style>
