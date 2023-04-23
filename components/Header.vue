<template>
  <header :class="headerClass">
    <NuxtLink class="main-title-link" to="/">
      <div v-if="headerClass === 'full'" class="website-title">
        My Programming Journey
      </div>
      <img v-else class="website-logo" src="/my_programming_journey_logo.png" />
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
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import ChangeTheme from "~/components/ChangeTheme.vue";
import { mdiClose } from "@mdi/js";

@Component({ components: { ChangeTheme } })
export default class Header extends Vue {
  headerClass: string = "full";
  toggleMenu: boolean = false;
  mdiClose: string = mdiClose;

  get isFullHeader() {
    return this.$store.getters["persistent/isFullHeader"];
  }

  @Watch("$vuetify.breakpoint.width")
  updateWidth(width: number) {
    this.changeResponsiveHeader(width);
  }

  @Watch("isFullHeader")
  updateHeader() {
    if (process.browser) {
      if (!this.isFullHeader) {
        this.headerClass = "simple";
      } else {
        this.headerClass = "full";
        this.changeResponsiveHeader(window.innerWidth);
      }
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
      color: var(--v-text-base);
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
      & > .website-logo {
        width: 100%;
        object-fit: contain;
        object-position: center;
      }
    }

    .nav-link {
      visibility: hidden;
      z-index: 99;
      opacity: 0;
      position: fixed;
      height: 100%;
      right: 0;
      width: 0;
      padding: 35px 20px 15px 20px;
      -webkit-transition: width 0.3s ease-out, background-color 0.3s ease-out,
        opacity 0.3s ease-out;
      -moz-transition: width 0.3s ease-out, background-color 0.3s ease-out,
        opacity 0.3s ease-out;
      -ms-transition: width 0.3s ease-out, background-color 0.3s ease-out,
        opacity 0.3s ease-out;
      -o-transition: width 0.3s ease-out, background-color 0.3s ease-out,
        opacity 0.3s ease-out;
      transition: width 0.3s ease-out, background-color 0.3s ease-out,
        opacity 0.3s ease-out;

      &.active {
        visibility: visible;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 1;
        height: 100%;
        top: 0;
        background-color: white;
        width: 350px;
        overflow-x: hidden;
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
    background-color: var(--v-text-base);
    width: 30px;
    display: inline-block;
    height: 3px;
    margin-bottom: 5px;
    opacity: 1;

    /*     -webkit-transition: transform 0.3s ease-out, background-color 0.3s ease-out,
      opacity 0.3s ease;
    -moz-transition: transform 0.3s ease-out, background-color 0.3s ease-out,
      opacity 0.3s ease;
    -ms-transition: transform 0.3s ease-out, background-color 0.3s ease-out,
      opacity 0.3s ease;
    -o-transition: transform 0.3s ease-out, background-color 0.3s ease-out,
      opacity 0.3s ease;
    transition: transform 0.3s ease-out, background-color 0.3s ease-out,
      opacity 0.3s ease; */

    &:first-child {
      transform-origin: 0px 0px;
    }

    &:last-child {
      transform-origin: 0px 0px;
    }
  }

  /* &.active {
    & > span:first-child {
      transform: rotate(45deg);
      transform-origin: 3px 2px;
    }
    & > span:nth-child(2) {
      opacity: 0;
    }
    & > span:last-child {
      transform: rotate(-45deg);
      transform-origin: 4.5px 2px;
    }
  } */
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
      .nav-link.active {
        width: 100%;
      }
    }
  }
}
</style>
