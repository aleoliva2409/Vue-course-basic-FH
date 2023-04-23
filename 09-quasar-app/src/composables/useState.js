import { computed } from 'vue';
import { useStore } from 'vuex';

const useState = () => {
  const store = useStore();

  return {
    // Side Menu options
    // sideMenuOpen: computed( () => store.getters['ui/isSideMenuOpen'] ),
    sideMenuOpen: computed({
      get() {
        return store.getters['isSideMenuOpen'];
      },
      set(val) {
        store.commit('toggleSideMenu');
      },
    }),
    toggleSideMenu() {
      store.commit('toggleSideMenu');
    },
  };
};

export default useState;
