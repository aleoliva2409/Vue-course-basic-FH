<script lang="ts">
import { defineComponent } from 'vue';
import { usePlacesStore } from '../composables';
import MapView from '../components/MapView/MapView.vue';
import ButtonLocation from '../components/ButtonLocation.vue';
import SearchBar from '../components/SearchBar/SearchBar.vue';
import TripDetails from '../components/TripDetails.vue';

export default defineComponent({
  name: 'Home',
  components: { MapView, ButtonLocation, SearchBar, TripDetails },
  setup() {
    usePlacesStore();
  },
});
</script>

<template>
  <MapView />
  <ButtonLocation />
  <SearchBar />
  <TripDetails />
</template>
