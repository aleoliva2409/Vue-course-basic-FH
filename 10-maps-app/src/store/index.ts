import { createStore } from 'vuex';
import placesModule from './places';
import mapModule from './map';

const store = createStore({
  modules: {
    places: placesModule,
    map: mapModule,
  },
});

export default store;
