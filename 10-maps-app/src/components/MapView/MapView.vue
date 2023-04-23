<script lang="ts" src="./mapView.ts" />

<template>
  <div
    v-if="!isUserlocationReady"
    class="loading-map d-flex justify-content-center align-items-center"
  >
    <div class="text-center">
      <h3>Espere por favor!!</h3>
      <span>Localizando...</span>
    </div>
  </div>
  <div v-show="isUserlocationReady" class="map-container" ref="mapElement" />
</template>

<style scoped src="./mapView.css" />
