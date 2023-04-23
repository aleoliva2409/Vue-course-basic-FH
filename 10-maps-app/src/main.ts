import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGFubnlvbGl2YTQ3IiwiYSI6ImNrbnczMHc1ajBvaXUyb21tN3Vyajk1YmMifQ.6wephva17iAAvEOidnndkA';

if (!navigator.geolocation) {
  alert('Your navigator has not Geolocation option');
  throw new Error('Your navigator has not Geolocation option');
}

createApp(App).use(store).use(router).mount('#app');
