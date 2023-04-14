<template>
  <h1 v-if="!pokemon">Wait a minute please ...</h1>

  <div v-else>
    <h1>Who's that pokemon?</h1>

    <!-- img -->
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />

    <!-- options -->
    <!-- el metodo dentro de pokemon-selected(checkAnswer) recibe el como argumento lo que se emita, ejemplo @pokemon-selected="checkAnswer(evento emitido)" -->
    <PokemonOptions @pokemon-selected="checkAnswer" :pokemons="pokemons" />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button class="btn" @click="newGame">New game</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture';
import PokemonOptions from '@/components/PokemonOptions';

import getPokemonOptions from '@/helpers/getPokemonOptions';

// console.log(getPokemonOptions())

export default {
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemons: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: '',
    };
  },
  methods: {
    async mixPokemons() {
      this.pokemons = await getPokemonOptions();
      const randomId = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemons[randomId];
    },
    checkAnswer(id) {
      if (id) {
        this.showPokemon = true;
        this.showAnswer = true;

        if (id === this.pokemon.id) {
          this.message = `Right!! It's ${this.pokemon.name}`;
        } else {
          this.message = `Oops, you're wrong!!! It was ${this.pokemon.name}`;
        }
      }
    },
    newGame() {
      (this.pokemons = []),
        (this.pokemon = null),
        (this.showPokemon = false),
        (this.showAnswer = false),
        (this.message = ''),
        this.mixPokemons();
    },
  },
  mounted() {
    this.mixPokemons();
  },
};
</script>

<style lang="css" scoped>
.btn {
  font-size: 18px;
  border-radius: 15px;
  padding: 3px 6px;
  border: 1px solid black;
}
</style>
