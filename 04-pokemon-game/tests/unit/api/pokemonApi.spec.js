import pokemonApi from '@/api/pokemonApi';

describe('tests on pokemonApi', () => {
  test('axios should be configured with pokemon api', () => {
    expect(pokemonApi.defaults.baseURL).toBe(
      'https://pokeapi.co/api/v2/pokemon'
    );
  });
});
