import { MapState } from './state';

const getters = {
  isMapReady(state: MapState) {
    return !!state.map;
  },
};

export default getters;
