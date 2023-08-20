<template>
  <transition-group name="fade-transition">
    <LoadingBar v-if="isLoading" key="loading"></LoadingBar>
    <client-only v-else>
      <v-app key="app">
        <div class="blog-main-container">
          <Header></Header>
          <v-fade-transition mode="out-in">
            <Nuxt />
          </v-fade-transition>
          <ScrollToTop></ScrollToTop>
          <Footer></Footer>
        </div>
      </v-app>
    </client-only>
  </transition-group>
</template>


<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import ScrollToTop from "~/components/ScrollToTop.vue";
import LoadingBar from "~/components/LoadingBar.vue";

@Component({ components: { Header, Footer, ScrollToTop, LoadingBar } })
export default class App extends Vue {
  get isLoading() {
    return this.$store.getters["startLoading"];
  }
}
</script>
