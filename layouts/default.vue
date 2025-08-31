<template>
  <LoadingBar v-if="isLoading" key="loading"></LoadingBar>
  <v-app key="app" v-show="!isLoading">
    <div class="blog-main-container">
      <ClientOnly>
        <Header></Header>
      </ClientOnly>
      <slot />
      <ClientOnly>
        <ScrollToTop></ScrollToTop>
        <Footer></Footer>
      </ClientOnly>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { usePersistentStore, useRootStore } from "~/stores/app";

const store = useRootStore();
const persistentStore = usePersistentStore();
const route = useRoute();
const theme = useTheme();
const { isValid } = useValidator();

const isLoading = computed(() => {
  return store.startLoading;
});

onBeforeMount(() => {
  theme.change(persistentStore.isDarkTheme ? "dark" : "light");
});

onMounted(() => {
  if (isValid(route.meta?.fullHeader)) {
    const isFullHeader: boolean = !!route.meta?.fullHeader;
    persistentStore.setFullHeader(isFullHeader);
  }
});
</script>
