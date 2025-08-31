<template>
  <PostDetail
    v-if="postData"
    :postData="postData"
    :content="content"
    :previousPost="previousPost"
    :nextPost="nextPost"
  ></PostDetail>
</template>

<script setup lang="ts">
import type PostDetailInterface from "~/interfaces/PostDetailInterface";
import type OtherPostInterface from "~/interfaces/OtherPostInterface";

const { isValid } = useValidator();
const route = useRoute();

// data
let metaKeyword = "";
let metaDescription = "";
const content = ref("");

// get post data
let slug: string = "";
if (isValid(route.params.slug)) {
  slug = Array.isArray(route.params.slug)
    ? route.params.slug.join(" ")
    : route.params.slug;
}

const {
  data: postData,
  status,
  error,
} = await useAPI<PostDetailInterface>("/post/detail", {
  method: "GET",
  params: { slug },
  onResponse({ request, response, options }) {
    metaKeyword = response._data.meta_keyword;
    metaDescription = isValid(response._data.meta_description)
      ? response._data.meta_description
      : "";

    content.value = response._data.content;

    response._data = {
      id: response._data.id,
      slug: response._data.slug,
      title: response._data.title,
      date: response._data.date,
      category: response._data.category_name,
      category_id: response._data.category_id,
      tags: response._data.tags_data,
      reference:
        response._data.reference_array !== undefined &&
        Array.isArray(response._data.reference_array)
          ? response._data.reference_array
          : [],
    };
  },
});

if (status.value === "error" && error.value != null) {
  throw createError(errorFormatter(error.value));
}

// get previous post
const {
  data: previousPost,
  status: previousPostStatus,
  error: previousPostError,
} = await useAPI<OtherPostInterface>("/post/previous", {
  method: "GET",
  params: { id: postData.value?.id },
  onResponse({ request, response, options }) {},
});

if (previousPostStatus.value === "error" && previousPostError.value != null) {
  throw createError(errorFormatter(previousPostError.value));
}

// get next post
const {
  data: nextPost,
  status: nextPostStatus,
  error: nextPostError,
} = await useAPI<OtherPostInterface>("/post/next", {
  method: "GET",
  params: { id: postData.value?.id },
});

if (nextPostStatus.value === "error" && nextPostError.value != null) {
  throw createError(errorFormatter(nextPostError.value));
}

if (import.meta.client) {
  const meta = [
    { hid: "og:url", name: "og:url", content: window.location.href },
    { hid: "keyword", name: "keyword", content: metaKeyword },
  ];

  if (isValid(metaDescription)) {
    meta.push({
      hid: "description",
      name: "description",
      content: metaDescription,
    });
    meta.push({
      hid: "og:description",
      name: "og:description",
      content: metaDescription,
    });
  }

  useHead({
    title: postData.value?.title ?? "",
    meta,
  });
}
</script>
