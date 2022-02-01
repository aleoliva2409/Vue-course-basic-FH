<template>
  <h1>Counter - Vuex</h1>
  <!-- <h2>Direct access: {{ $store.state.count }}</h2> -->
  <h2>Direct access: {{ $store.state.counter.count }}</h2>
  <h2>Computed: {{ countComputed }}</h2>
  <h1>MapState</h1>
  <h2>mapState count: {{ counted }}</h2>
  <h2>mapState lastMutation: {{ lastMutation }}</h2>
  <!-- <h2>mapState lastMutation2: {{ lastMutation2 }}</h2> -->

  <button @click="increment">+1</button>
  <button @click="incrementBy">+5</button>
  <button @click="incrementRandomInt" :disabled="isLoading">random</button>
  <!-- <button @click="randomInt">random</button> -->

  <!-- <h2>Direct Getters: {{ $store.getters.squareCount }}</h2> -->
  <h2>Direct Getters: {{ $store.getters['counter/squareCount'] }}</h2>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  // ? many ways to get store data
  computed: {
    countComputed() {
      return this.$store.state.counter.count;
    },
    ...mapState('counter', ['count', 'lastMutation', 'isLoading']), // ? usamos el nombre que tiene en el store
    // ...mapState({
    //   count: state => state.count, //? EJ 1
    //   count: state => state.counter.count, // ? EJ 2
    //   lastMutation: state => state.lastMutation,
    //   lastMutation2: 'lastMutation' // ? le cambiamos el nombre al estado para llamarlo dentro del componente
    // })
  },
  // computed: mapState(['count'])
  methods: {
    increment() {
      // this.$store.commit('increment');
      this.$store.commit('counter/increment');
      },
    incrementBy() {
      // this.$store.commit('incrementBy', 5);
      this.$store.commit('counter/incrementBy', 5);
    },
    
    // incrementRandomInt() {
    //   this.$store.dispatch('incrementRandomInt') // ? creamos una funcion que ejecuta una action
    // },
    ...mapActions('counter' ,['incrementRandomInt']) // ? llamamos directamente a la action ( usamos el nombre que tiene en el store)
    // ...mapActions('counter', {
    //   randomInt: 'incrementRandomInt', // ? le cambiamos el nombre a la action
    // }),
  },
};
</script>

<style></style>
