<template>
  <div id="nav">
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/about">About</RouterLink> |
    <RouterLink :to="{ name: 'counter' }">Counter</RouterLink> |
    <RouterLink :to="{ name: 'users' }">Usuarios</RouterLink> |
    <RouterLink :to="{ name: 'pokemon-search' }">Buscar</RouterLink> |
    <RouterLink :to="{ name: 'todo' }">Todo</RouterLink> |
    <RouterLink :to="{ name: 'slots' }">Slots</RouterLink>
  </div>

  <RouterView v-slot="{ Component, route }">
    <KeepAlive>
      <component :is="Component" :key="route.name" />
    </KeepAlive>
  </RouterView>

  <!-- <router-view /> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
