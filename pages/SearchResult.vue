<template>
  <div>
    <template v-if="(searchResultList?.total ?? 0) !== 0">
      <div class="post-type">{{ resultText }}: {{ keyword }}</div>
      <PostPage
        :postData="searchResultList?.data ?? []"
        :currentPage="pages"
        :totalPost="searchResultList?.total ?? 0"
        :pageType="source"
      ></PostPage>
    </template>
    <SearchEmpty v-else :descriptionText="searchNotFoundText"></SearchEmpty>
  </div>
</template>

<script lang="ts" setup>
import type PostPageInterface from "~/interfaces/PostPageInterface";

const route = useRoute();
const { isValid } = useValidator();

const source = route.meta !== undefined ? route.meta.source : "";
let keyword: string = Array.isArray(route.params.keyword)
  ? route.params.keyword.join(" ")
  : route.params.keyword;
let pages: number = 1;

let resultText = "";
let errorMessage = "";
let searchNotFoundText = "";
let key = "";

if (source === "search") {
  errorMessage = "Search not found";
} else if (source === "category") {
  errorMessage = "Category not found";
} else if (source === "tags") {
  errorMessage = "Tag not found";
} else {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
}

if (isValid(keyword)) {
  if (source !== "tags") {
    keyword = keyword.replaceAll("-", " ");
  }
} else {
  throw createError({
    statusCode: 404,
    statusMessage: errorMessage,
    fatal: true,
  });
}

if (isValid(route.params.pages)) {
  pages = parseInt(route.params.pages.toString());
  if (isNaN(pages)) {
    throw createError({
      statusCode: 404,
      statusMessage: errorMessage,
      fatal: true,
    });
  }
}

let params: any = { pages };
if (source === "search") {
  resultText = "Search Result";
  searchNotFoundText = `Search result for ${keyword} not found.`;
  key = "/explore/post";
  params = { ...params, keyword };
} else if (source === "category") {
  resultText = "Category";
  searchNotFoundText = `Category ${keyword} not found.`;
  key = "/categories/list";
  params = { ...params, category: keyword };
} else if (source === "tags") {
  resultText = "Tag";
  searchNotFoundText = `Tag ${keyword} not found.`;
  key = "/tag/list";
  params = { ...params, tag: keyword };
}

const {
  data: searchResultList,
  status,
  error,
} = await useAPI<{
  data: Array<PostPageInterface>;
  total: number;
}>(key, {
  method: "GET",
  params,
  onResponse({ request, response, options }) {
    const formatData: Array<PostPageInterface> = [];
    const responseData = response._data.data;
    if (
      responseData !== undefined &&
      responseData !== null &&
      responseData !== "" &&
      Array.isArray(responseData)
    ) {
      for (let i = 0; i < responseData.length; i++) {
        const data = {
          title: responseData[i].title,
          date: responseData[i].date,
          slug: responseData[i].slug,
          category: responseData[i].category_name,
          category_id: responseData[i].category_id,
          tags: responseData[i].tags_data,
          preview: responseData[i].content,
        };

        formatData.push(data);
      }
    }

    response._data.data = formatData;
  },
});

if (status.value === "error" && error.value != null) {
  throw createError(errorFormatter(error.value));
}

if (import.meta.client) {
  let keyword = Array.isArray(route.params.keyword)
    ? route.params.keyword.join(" ")
    : route.params.keyword;
  useHead({
    title: `${resultText} - ${keyword.replaceAll("-", " ")}`,
    meta: [{ name: "og:url", content: window.location.href }],
  });
}
</script>
