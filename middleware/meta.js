export default ({ route, store }) => {
  store.dispatch("persistent/setFullHeader", route.meta[0]?.fullHeader);
};
