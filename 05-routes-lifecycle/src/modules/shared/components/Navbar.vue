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
    <RouterLink :to="{ name: 'pokemon-home' }" >Home</RouterLink>
    <RouterLink :to="{ name: 'pokemon-id', params: { id: 45 } }" >Pokemon Page</RouterLink>
    <RouterLink :to="{ name: 'pokemon-about' }" >About</RouterLink>
    <RouterLink :to="{ name: 'dbz-characters' }" >Characters</RouterLink>
    <RouterLink :to="{ name: 'dbz-about' }" >About</RouterLink>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  div {
    padding: 0 30;
  }

  div a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 10px;
    text-decoration: underline;
  }

  div .router-link-exact-active {
    color: #42b983;
  }
</style>