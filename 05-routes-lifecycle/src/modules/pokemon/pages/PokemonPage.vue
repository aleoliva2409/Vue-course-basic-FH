<template>
  <h1>Pokemon: #{{ id }}</h1>
  <div v-if="pokemon">
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pokemon: null,
    };
  },
  created() {
    this.getPokemon();
  },
  methods: {
    async getPokemon() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        const pokemon = await res.json();
        this.pokemon = pokemon;
      } catch (error) {
        this.$router.push('/');
      }
    },
  },
  watch: {
    id() {
      this.getPokemon();
    },
  },
};
</script>
