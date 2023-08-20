export default ({ app, store }) => {
  let timeCounter = null;

  app.router.beforeEach((to, from, next) => {
    if (timeCounter !== null) {
      clearTimeout(timeCounter);
      timeCounter = null;
    }
    store.dispatch("setLoading", true);
    next();
  });

  app.router.afterEach((to, from) => {
    timeCounter = setTimeout(() => {
      store.dispatch("setLoading", false);
    }, 500);
  });
};
