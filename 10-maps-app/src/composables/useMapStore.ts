import { computed } from 'vue';
import { useStore } from 'vuex';

import Mapboxgl from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { LngLat } from '../store/map/actions';

const useMapStore = () => {
  const store = useStore();

  return {
    map: computed(() => store.state.map.map),
    distance: computed(() => store.state.map.distance),
    duration: computed(() => store.state.map.duration),

    // Getters
    isMapReady: computed<boolean>(() => store.getters['map/isMapReady']),

    // Mutations
    setMap: (map: Mapboxgl.Map) => store.commit('map/setMap', map),
    setPlaceMarkers: (places: Feature[]) =>
      store.commit('map/setPlaceMarkers', places),

    // Actions
    getRouteBetweenPoints: (start: LngLat, end: LngLat) =>
      store.dispatch('map/getRouteBetweenPoints', { start, end }),
  };
};

export default useMapStore;
