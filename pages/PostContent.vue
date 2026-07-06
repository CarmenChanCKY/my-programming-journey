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
const previousPost = ref<OtherPostInterface | null>(null);
const nextPost = ref<OtherPostInterface | null>(null);
const previousPostError = ref<any>(null);
const nextPostError = ref<any>(null);

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
    const raw = response._data as any;
    metaKeyword = raw.meta_keyword;
    metaDescription = isValid(raw.meta_description) ? raw.meta_description : "";

    content.value = raw.content;

    response._data = {
      id: raw.id,
      slug: raw.slug,
      title: raw.title,
      date: raw.date,
      category: raw.category_name,
      category_id: raw.category_id,
      tags: raw.tags_data,
      reference:
        raw.reference_array !== undefined && Array.isArray(raw.reference_array)
          ? raw.reference_array
          : [],
    };
  },
});

if (status.value === "error" && error.value != null) {
  throw createError(errorFormatter(error.value));
}

// get previous & next post after postData is available
watch(
  () => postData.value?.id,
  async (id) => {
    if (!id) return;

    const { data: prev, error: prevErr } = await useAPI<OtherPostInterface>(
      "/post/previous",
      { method: "GET", params: { id } },
    );
    previousPost.value = prev.value;
    previousPostError.value = prevErr.value;

    if (prevErr.value != null) {
      throw createError(errorFormatter(prevErr.value));
    }

    const { data: nxt, error: nxtErr } = await useAPI<OtherPostInterface>(
      "/post/next",
      { method: "GET", params: { id } },
    );
    nextPost.value = nxt.value;
    nextPostError.value = nxtErr.value;

    if (nxtErr.value != null) {
      throw createError(errorFormatter(nxtErr.value));
    }
  },
  { immediate: true },
);

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
