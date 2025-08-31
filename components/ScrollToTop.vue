<template>
  <v-fab
    :class="{ 'custom-fab': true, active: showScrollButton }"
    app
    color="primary"
    elevation="1"
    size="small"
    icon="mdi mdi-arrow-up"
    :disabled="!showScrollButton"
    @click="scroll"
  >
  </v-fab>
</template>

<script lang="ts" setup>
const { isValid } = useValidator();

// data
const showScrollButton = ref<boolean>(false);
let scrollToTopListener: any = null;

function handleScrollPos() {
  let pos = window.scrollY;
  if (pos <= 0 && showScrollButton.value) {
    showScrollButton.value = false;
    if (isValid(scrollToTopListener)) {
      window.removeEventListener("scroll", handleScrollPos);
      scrollToTopListener = null;
    }
  } else if (pos > 0 && !showScrollButton.value) {
    showScrollButton.value = true;
    if (!isValid(scrollToTopListener)) {
      scrollToTopListener = window.addEventListener("scroll", handleScrollPos);
    }
  }
}

function scroll() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  handleScrollPos();
}

onMounted(() => {
  if (!isValid(scrollToTopListener)) {
    scrollToTopListener = window.addEventListener("scroll", handleScrollPos);
  }
});

onBeforeUnmount(() => {
  if (isValid(scrollToTopListener)) {
    window.removeEventListener("scroll", handleScrollPos);
    scrollToTopListener = null;
  }
});
</script>

<style lang="scss" scoped>
@use "~/assets/styles/global.scss" as *;

.custom-fab {
  position: fixed;
  bottom: 16px !important;
  right: 16px;
  opacity: 0;
  transition: opacity 0.3s;
  width: auto !important;

  & * {
    pointer-events: none !important;
  }

  &.active {
    opacity: 1;

    & * {
      pointer-events: all !important;
    }
  }
}
</style>
