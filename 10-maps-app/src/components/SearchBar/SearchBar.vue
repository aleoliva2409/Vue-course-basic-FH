<script lang="ts" src="./searchBar.ts" />

<template>
  <div class="searchbar-container">
    <input
      class="form-control"
      type="text"
      placeholder="Buscar lugares..."
      v-model="searchTerm"
    />
    <SearchResults />
  </div>
</template>

<style src="./searchBar.css" scoped />