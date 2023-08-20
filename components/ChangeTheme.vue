<template>
  <v-fade-transition mode="out-in">
    <v-btn icon color="themeBtn" @click="toggleTheme">
      <v-icon>{{ $vuetify.theme.dark ? darkButton : lightButton }}</v-icon>
    </v-btn>
  </v-fade-transition>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class ChangeTheme extends Vue {
  lightButton: string = `mdi-white-balance-sunny`;
  darkButton: string = "mdi-moon-waxing-crescent";

  get theme(): boolean {
    return this.$store.getters["persistent/isDarkTheme"];
  }
  @Watch("theme")
  setVuetifyTheme() {
    this.updateTheme();
  }

  // methods
  toggleTheme() {
    this.$store.dispatch("persistent/toggleTheme");
  }

  updateTheme() {
    const currentTheme = this.theme;
    this.$vuetify.theme.dark = currentTheme;
    this.$colorMode.preference = currentTheme ? "dark" : "light";
  }

  // lifecycle
  created() {
    setTimeout(() => {
      this.updateTheme();
    }, 200);
  }
}
</script>
