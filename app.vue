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

// initialize theme
theme.change(colorMode.preference);

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});
</script>
