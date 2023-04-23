import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const usePlacesStore = () => {
  const store = useStore();

  onMounted(() => {
    if (!store.getters['places/isUserlocationReady']) {
      store.dispatch('places/getInitialLocation');
    }
  });

  return {
    // State
    isLoading: computed(() => store.state.places.isLoading),
    userLocation: computed(() => store.state.places.userLocation),
    places: computed(() => store.state.places.places),
    isLoadingPlaces: computed(() => store.state.places.isLoadingPlaces),

    // Getters
    isUserlocationReady: computed<boolean>(
      () => store.getters['places/isUserlocationReady']
    ),

    // Actions
    searchPlacesByTerm: (query = '') =>
      store.dispatch('places/searchPlacesByTerm', query),

    // Mutations
  };
};

export default usePlacesStore;
