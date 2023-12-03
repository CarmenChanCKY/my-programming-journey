<template>
  <transition-group name="fade-transition">
    <LoadingBar v-if="isLoading" key="loading"></LoadingBar>
    <client-only v-else>
      <v-app key="app">
        <v-fade-transition mode="out-in">
          <Nuxt />
        </v-fade-transition>
      </v-app>
    </client-only>
  </transition-group>
</template>
  
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import LoadingBar from "~/components/LoadingBar.vue";

@Component({ components: { LoadingBar } })
export default class Empty extends Vue {
  get isLoading() {
    return this.$store.getters["startLoading"];
  }
}
</script>
