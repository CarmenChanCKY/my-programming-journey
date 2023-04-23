<template>
  <v-app>
    <div class="blog-main-container">
      <Header></Header>
      <v-fade-transition mode="out-in">
        <Nuxt />
      </v-fade-transition>
      <ScrollToTop></ScrollToTop>
      <Footer></Footer>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import ScrollToTop from "~/components/ScrollToTop.vue";

@Component({ components: { Header, Footer, ScrollToTop } })
export default class App extends Vue {
}
</script>


