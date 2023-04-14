<template>
  <!-- <Counter v-bind:start="15" /> -->
  <!-- <Counter :start="15" /> -->
  <Indesicion />
</template>

<script>
// import Counter from './components/Counter.vue'
import Indesicion from '@/components/Indesicion.vue';

export default {
  name: 'App',
  components: {
    // Counter,
    Indesicion,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
