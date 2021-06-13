import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "vuex",
    paths: ["user", "notification"], // arquivo que deseja salvar no storage
  })(store);
};
