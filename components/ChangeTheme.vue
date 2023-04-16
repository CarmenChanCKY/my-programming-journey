<template>
  <v-fade-transition mode="out-in">
    <v-btn icon color="themeBtn" @click="toggleTheme">
      <v-icon>{{ $vuetify.theme.dark ? darkButton : lightButton }}</v-icon>
    </v-btn>
  </v-fade-transition>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ChangeTheme extends Vue {
  lightButton: string = `mdi-white-balance-sunny`;
  darkButton: string = "mdi-moon-waxing-crescent";

  toggleTheme() {
    this.$store.dispatch("persistent/toggleTheme");
  }
}
</script>
