<template>
  <v-btn
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
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { mdiArrowUp } from "@mdi/js";

@Component
export default class ScrollToTop extends Vue {
  topIcon: string = mdiArrowUp;

  scroll() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
</script>
