<template>
  <section class="archive-container">
    <div class="page-title">Archive</div>

    <TitleList
      v-if="isValid(archiveData)"
      :listItem="archiveData ?? []"
    ></TitleList>

    <div class="not-found-container" v-else>
      <div>Archive not Found</div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useAPI } from "~/composables/useAPI";
import type TitleListInterface from "~/interfaces/TitleListInterface.ts";

if (import.meta.client) {
  useHead({
    title: "Archive",
    meta: [{ name: "og:url", content: window.location.href }],
  });
}

const { isValid } = useValidator();

const {
  data: archiveData,
  status,
  error,
} = await useAPI<Array<TitleListInterface>>("/post/archive", {
  method: "GET",
  onResponse({ request, response, options }) {
    response._data = response._data.data.map((obj: any) => {
      return {
        listTitle: obj.post_year_month,
        list: obj.post_list,
      };
    });
  },
});

if (status.value === "error" && error.value != null) {
  throw createError(errorFormatter(error.value));
}
</script>

<style lang="scss" scoped>
@use "~/assets/styles/global.scss" as *;

.archive-container {
  @extend %center-div;
}
</style>
