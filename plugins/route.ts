export default defineNuxtPlugin({
  parallel: true,
  async setup(nuxtApp) {
    let timeCounter: any = null;
    const store = useRootStore();
    const persistentStore = usePersistentStore();
    const router = useRouter();

    router.beforeEach(() => {
      if (timeCounter !== null) {
        clearTimeout(timeCounter);
        timeCounter = null;
      }
      store.setLoading(true);
    });

    router.afterEach((to) => {
      // set full header / simple header
      const meta = to.meta;
      if (
        meta.fullHeader !== undefined &&
        meta.fullHeader !== null &&
        typeof meta.fullHeader === "boolean"
      ) {
        persistentStore.setFullHeader(meta.fullHeader);
      }

      timeCounter = setTimeout(() => {
        store.setLoading(false);
      }, 500);
    });
  },
});
