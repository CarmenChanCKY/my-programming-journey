<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  titleTemplate(title: string | undefined) {
    return title
      ? `${title} | My Programming Journey`
      : "My Programming Journey";
  },
});

const nuxtApp = useNuxtApp();
const colorMode = useColorMode();
const theme = useTheme();
const store = usePersistentStore();
// initialize theme
const currentTheme = store.isDarkTheme ? "dark" : "light";
colorMode.preference = currentTheme;
theme.change(currentTheme);

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});
</script>
