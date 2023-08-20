<template>
  <div class="loading-container">
    <div class="spinner-container">
      <v-progress-circular
        indeterminate
        size="75"
        width="5"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LoadingBar extends Vue {}
</script>


<style lang="scss" scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*   background-color: var(--v-background-base); */
}

.spinner-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
}

html.dark-mode {
  .loading-container {
    background-color: #2b2929;
  }

  .v-progress-circular {
    color: #6cbfe8;
  }
}

html.light-mode {
  .loading-container {
    background-color: #f7f7f7;
  }

  .v-progress-circular {
    color: #007095;
  }
}
</style>
