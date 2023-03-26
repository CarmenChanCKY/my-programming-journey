import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: "MyProgrammingJourneyVuex",
    storage: window.localStorage,
    modules: ["persistent"],
  }).plugin(store);
}