import { createStore } from 'vuex';

const store = createStore({
  getters: {
    isSideMenuOpen(state) {
      return state.isSideMenuOpen;
    },
  },
  mutations: {
    toggleSideMenu(state) {
      state.isSideMenuOpen = !state.isSideMenuOpen;
    },
  },
  state: {
    isSideMenuOpen: true,
  },
});

export default store;
