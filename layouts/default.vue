<template>
  <v-app>
    <v-fade-transition mode="out-in">
      <Nuxt />
    </v-fade-transition>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
