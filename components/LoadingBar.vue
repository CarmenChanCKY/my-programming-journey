<template>
  <div
    :class="{
      'loading-container': true,
      'dark-mode': isDarkTheme,
      'light-mode': !isDarkTheme,
    }"
  >
    <div class="spinner-container">
      <v-progress-circular
        :indeterminate="true"
        size="75"
        width="5"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePersistentStore } from "~/stores/app";

const store = usePersistentStore();

const isDarkTheme = computed(() => {
  return store.isDarkTheme;
});
</script>

<style lang="scss" scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.spinner-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
}

.loading-container {
  &.dark-mode {
    background-color: #232023;

    .v-progress-circular {
      color: #6cbfe8;
    }
  }

  &.light-mode {
    background-color: #f2f3f4;

    .v-progress-circular {
      color: #007095;
    }
  }
}
</style>
