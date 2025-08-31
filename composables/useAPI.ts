import type { UseFetchOptions } from "nuxt/app";

export function useAPI<T>(url: string, options?: UseFetchOptions<T>) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$customFetch as typeof $fetch,
  });
}

export function errorFormatter(responseData: any) {
  if (responseData != null && responseData.data != null) {
    return {
      statusCode: responseData.data.status,
      statusMessage: responseData.data.name,
      data: { description: responseData.data.description },
      fatal: true, // Set to true to trigger a full-screen error page}
    };
  } else {
    return {
      statusCode: 500,
      statusMessage: "Server Error",
      fatal: true, // Set to true to trigger a full-screen error page
    };
  }
}
