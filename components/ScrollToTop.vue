<template>
  <transition name="scrollTop-animation">
    <v-btn
      v-if="showScrollButton"
      color="primary"
      elevation="1"
      fab
      right
      bottom
      fixed
      small
      @click="scroll"
    >
      <v-icon> {{ topIcon }} </v-icon>
    </v-btn>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { mdiArrowUp } from "@mdi/js";

@Component
export default class ScrollToTop extends Vue {
  // data
  showScrollButton: boolean = false;
  scrollToTopListener: any = null;
  topIcon: string = mdiArrowUp;

  @Watch("$vuetify.breakpoint.width")
  updateWidth(width: number) {
    if (width < 600) {
      if (this.scrollToTopListener !== null) {
        window.removeEventListener("scroll", this.handleScrollPos);
        this.scrollToTopListener = null;
      }
      this.showScrollButton = false;
    } else {
      if (this.scrollToTopListener === null) {
        this.scrollToTopListener = window.addEventListener(
          "scroll",
          this.handleScrollPos
        );
      }
    }
  }

  handleScrollPos() {
    let pos = window.scrollY;
    if (pos <= 0 && this.showScrollButton) {
      this.showScrollButton = false;
    } else if (pos > 0 && !this.showScrollButton) {
      this.showScrollButton = true;
    }
  }

  scroll() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  mounted() {
    if (this.scrollToTopListener === null) {
      this.scrollToTopListener = window.addEventListener(
        "scroll",
        this.handleScrollPos
      );
    }
  }

  beforeDestroy() {
    if (this.scrollToTopListener !== null) {
      window.removeEventListener("scroll", this.handleScrollPos);
      this.scrollToTopListener = null;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/global.scss";
.scrollTop-animation-enter-active,
.scrollTop-animation-leave-active {
  transition: opacity 0.3s;
}

.scrollTop-animation-enter,
.scrollTop-animation-leave-to {
  opacity: 0;
}
</style>
