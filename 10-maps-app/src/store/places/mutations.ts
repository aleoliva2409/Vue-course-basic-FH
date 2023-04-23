import { PlacesState } from './state';
import { Feature } from '../../interfaces/places';

const mutation = {
  setLngLat(state: PlacesState, { lng, lat }: { lng: number; lat: number }) {
    // a line to prevent linter errors
    state.userLocation = [lng, lat];
    state.isLoading = false;
  },

  setIsLoadingPlaces(state: PlacesState) {
    state.isLoadingPlaces = true;
  },

  setPlaces(state: PlacesState, places: Feature[]) {
    state.places = places;
    state.isLoadingPlaces = false;
  },
};

export default mutation;
