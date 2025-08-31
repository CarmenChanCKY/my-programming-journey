<template>
  <PostPage
    :postData="postData?.data ?? []"
    :totalPost="postData?.total ?? 0"
    :pageType="'post'"
  ></PostPage>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/useAPI";
import type PostPageInterface from "~/interfaces/PostPageInterface";

if (import.meta.client) {
  useHead({
    meta: [{ name: "og:url", content: window.location.href }],
  });
}

const route = useRoute();

const {
  data: postData,
  status,
  error,
} = await useAPI<{ data: Array<PostPageInterface>; total: number }>(
  "/post/list",
  {
    params: { pages: route.params.pages },
    onResponse({ request, response, options }) {
      // format post data
      if (
        response._data.data !== undefined &&
        response._data.data != null &&
        Array.isArray(response._data.data)
      ) {
        response._data.data = response._data.data.map((obj: any) => {
          return {
            title: obj.title,
            date: obj.date,
            slug: obj.slug,
            category: obj.category_name,
            category_id: obj.category_id,
            tags: obj.tags_data,
            preview: obj.content,
          } as PostPageInterface;
        });
      }
    },
  }
);

if (status.value === "error" && error.value != null) {
  throw createError(errorFormatter(error.value));
}
</script>
