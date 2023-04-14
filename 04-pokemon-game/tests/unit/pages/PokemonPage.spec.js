import { shallowMount } from '@vue/test-utils';
import PokemonPage from '@/pages/PokemonPage';
import PokemonOptions from '@/components/PokemonOptions';
import PokemonPicture from '@/components/PokemonPicture';
import { pokemons } from '../mocks/pokemons.mock';

describe('PokemonPage Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  test('should match with snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should call mixPokemons when it was mounted', () => {
    const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemons');

    shallowMount(PokemonPage);

    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  test('should match with snapshot when mixPokemons were loaded', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: '',
        };
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should show PokemonPicture and PokemonOptions components', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: '',
        };
      },
    });

    const pokemonPicture = wrapper.findComponent(PokemonPicture);
    //? otra opcion
    // const { pokemonId } = pokemonPicture.props()
    const pokemonOptions = wrapper.findComponent(PokemonOptions);

    expect(pokemonPicture.exists()).toBeTruthy();
    expect(pokemonOptions.exists()).toBeTruthy();
    expect(pokemonPicture.vm.pokemonId).toBe(5);
    expect(pokemonOptions.vm.pokemons).toEqual(pokemons);
  });

  test('tests on checkAnswer', async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: '',
        };
      },
    });

    await wrapper.vm.checkAnswer(5);

    expect(wrapper.find('h2').exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBe(true);
    expect(wrapper.find('h2').text()).toBe(`Right!! It's ${pokemons[0].name}`);

    await wrapper.vm.checkAnswer(10);

    expect(wrapper.vm.message).toBe(`Oops, you're wrong!!! It was ${pokemons[0].name}`);
  });
});
