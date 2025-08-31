<template>
  <v-btn
    :icon="
      isDarkTheme
        ? 'mdi mdi-moon-waxing-crescent'
        : 'mdi mdi-white-balance-sunny'
    "
    color="themeBtn"
    @click="toggleTheme"
    variant="text"
    density="comfortable"
  >
  </v-btn>
</template>

<script lang="ts" setup>
import { usePersistentStore } from "~/stores/app";

const colorMode = useColorMode();
const theme = useTheme();
const store = usePersistentStore();

const isDarkTheme = computed(() => {
  return store.isDarkTheme;
});

// methods
function toggleTheme() {
  store.setTheme(!isDarkTheme.value);
  updateTheme();
}

function updateTheme() {
  colorMode.preference = isDarkTheme.value ? "dark" : "light";
  theme.change(isDarkTheme.value ? "dark" : "light");
}
</script>
