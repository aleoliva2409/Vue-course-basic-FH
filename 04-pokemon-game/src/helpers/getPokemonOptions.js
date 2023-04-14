import pokemonApi from '../api/pokemonApi';

export const getPokemons = () => {
  const pokemonsArr = Array.from(Array(650));
  return pokemonsArr.map((_, index) => index + 1);
};

export const getPokemonNames = async (pokemonsIds = []) => {
// const getPokemonNames = async ([a, b, c, d] = []) => {
  // const promiseArr = [
  //   pokemonApi.get(`/${a}`),
  //   pokemonApi.get(`/${b}`),
  //   pokemonApi.get(`/${c}`),
  //   pokemonApi.get(`/${d}`),
  // ];

  const promiseArr = pokemonsIds.map(p => pokemonApi.get(`/${p}`));

  // const [p1, p2, p3, p4] = await Promise.all(promiseArr);
  const resp = await Promise.all(promiseArr);

  // return [
  //   { name: p1.data.name, id: p1.data.id },
  //   { name: p2.data.name, id: p2.data.id },
  //   { name: p3.data.name, id: p3.data.id },
  //   { name: p4.data.name, id: p4.data.id },
  // ];

  return resp.map(p => ({ name: p.data.name, id: p.data.id}))
};

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));

  // console.table (pokemons)
  return pokemons;
};

export default getPokemonOptions;
