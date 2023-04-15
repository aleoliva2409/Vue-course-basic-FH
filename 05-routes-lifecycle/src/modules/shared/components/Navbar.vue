<template>
  <h1>Navbar</h1>
  <!-- <div>
    RouterLink traditional
    <RouterLink to="/" >Home</RouterLink>
    <RouterLink :to="{ name: 'pokemonDetail', params: { id: 45 } }" >Pokemon Page</RouterLink>
    <RouterLink to="/about" >About</RouterLink>
  </div> -->
  <div>
    <!--  RouterLink with name route -->
    <!-- <RouterLink :to="{ name: 'pokemon-home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'pokemon-id', params: { id: 45 } }"
      >Pokemon Page</RouterLink
    >
    <RouterLink :to="{ name: 'pokemon-about' }">About</RouterLink>
    <RouterLink :to="{ name: 'dbz-characters' }">Characters</RouterLink>
    <RouterLink :to="{ name: 'dbz-about' }">About</RouterLink> -->
    <CustomLink v-for="link in links" :key="link.to" :link="link" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
  data() {
    return {
      links: [
        { to: 'pokemon-home', name: 'Pokemons' },
        { to: 'pokemon-id', name: 'Por ID', id: 151 },
        { to: 'pokemon-about', name: 'About' },

        { to: 'dbz-characters', name: 'Personajes' },
        { to: 'dbz-about', name: 'DBZ-About' },
        { to: 'https://google.com', name: 'Google' },
      ],
    };
  },
  components: {
    CustomLink: defineAsyncComponent(() => import('./CustomLink.vue')),
  },
};
</script>

<style scoped>
div {
  padding: 0 30px;
}
div a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}
/* a.router-link-exact-active {
    color: #42b983;
} */
</style>
