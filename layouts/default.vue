<template>
  <v-app>
    <div class="blog-main-container">
      <Header></Header>
      <v-fade-transition mode="out-in">
        <Nuxt />
      </v-fade-transition>
      <transition name="scrollTop-animation">
        <ScrollToTop v-if="showScrollButton"></ScrollToTop>
      </transition>
      <Footer></Footer>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import ScrollToTop from "~/components/ScrollToTop.vue";

@Component({ components: { Header, Footer, ScrollToTop } })
export default class App extends Vue {
  // data
  showScrollButton: boolean = false;
  scrollToTopListener: any = null;

  get theme(): boolean {
    return this.$store.getters["persistent/isDarkTheme"];
  }
  @Watch("theme")
  setVuetifyTheme() {
    this.updateTheme();
  }

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

  // methods
  updateTheme() {
    const currentTheme = this.theme;
    this.$vuetify.theme.dark = currentTheme;
  }

  handleScrollPos() {
    let pos = window.scrollY;
    if (pos <= 0 && this.showScrollButton) {
      this.showScrollButton = false;
    } else if (pos > 0 && !this.showScrollButton) {
      this.showScrollButton = true;
    }
  }

  // lifecycle
  created() {
    setTimeout(() => {
      this.updateTheme();
    }, 200);
  }

  mounted() {
    if (this.scrollToTopListener === null) {
      this.scrollToTopListener = window.addEventListener(
        "scroll",
        this.handleScrollPos
      );
    }
  }
  destroyed() {
    if (this.scrollToTopListener !== null) {
      window.removeEventListener("scroll", this.handleScrollPos);
      this.scrollToTopListener = null;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

.blog-main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.blog-main-content {
  flex-grow: 1;
}

.scrollTop-animation-enter-active,
.scrollTop-animation-leave-active {
  transition: opacity 0.3s;
}

.scrollTop-animation-enter,
.scrollTop-animation-leave-to {
  opacity: 0;
}
</style>
