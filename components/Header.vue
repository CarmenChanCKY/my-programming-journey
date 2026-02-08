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

    <v-overlay
      :model-value="toggleMenu"
      z-index="90"
      absolute
      persistent
    ></v-overlay>

    <div :class="{ 'nav-link': true, active: toggleMenu }">
      <div class="nav-close-btn" v-if="headerClass === 'simple'">
        <v-btn
          variant="text"
          icon="mdi mdi-close"
          size="x-large"
          density="comfortable"
          @click="toggleMenu = false"
        >
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

<script setup lang="ts">
import { usePersistentStore } from "~/stores/app";

const store = usePersistentStore();
const { width } = useDisplay();
const route = useRoute();

const headerClass = ref<string>("full");
const toggleMenu = ref<boolean>(false);

const isFullHeader = computed(() => {
  return store.isFullHeader;
});

watch(
  () => width.value,
  function (newVal: number) {
    changeResponsiveHeader(newVal);
  }
);

watch(
  () => isFullHeader.value,
  function (newVal: boolean) {
    if (!newVal) {
      headerClass.value = "simple";
    } else {
      headerClass.value = "full";
      changeResponsiveHeader(window.innerWidth);
    }
  },
  { immediate: true }
);

watch(
  () => route.path,
  function (newVal: string) {
    if (toggleMenu.value) {
      toggleMenu.value = false;
    }
  }
);

function changeResponsiveHeader(width: number) {
  if (isFullHeader.value) {
    if (width < 520) {
      headerClass.value = "simple";
    } else {
      toggleMenu.value = false;
      headerClass.value = "full";
    }
  }
}
</script>

<style lang="scss" scoped>
@use "~/assets/styles/global.scss" as *;

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
      margin-bottom: var(--default-padding);
      font-weight: bold;
      color: rgb(var(--v-theme-colorText));
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
        color: rgb(var(--v-theme-primary));

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
      color: rgb(var(--v-theme-primary));

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
      padding: 35px var(--default-padding) 15px var(--default-padding);
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
        background-color: rgb(var(--v-theme-drawerBackground));
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
          color: rgb(var(--v-theme-primary));

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
    background-color: rgb(var(--v-theme-colorText));
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
