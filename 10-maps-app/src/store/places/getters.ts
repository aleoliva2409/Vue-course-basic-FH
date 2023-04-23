import { PlacesState } from './state';

const getters = {
  isUserlocationReady(state: PlacesState) {
    return !!state.userLocation;
  },
};

export default getters;
