export default defineNuxtPlugin({
  parallel: true,
  async setup(nuxtApp) {
    // set api baseUrl
    const config = useRuntimeConfig();

    const customFetch = $fetch.create({
      baseURL: config.public.backendUrl,
    });

    return {
      provide: {
        customFetch,
      },
    };
  },
});
