import { shallowMount } from '@vue/test-utils';
import PokemonOptions from '@/components/PokemonOptions';
import { pokemons } from '../mocks/pokemons.mock';

describe('PokemonOptions Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons,
      },
    });
  });

  test('should match with snapshot', () => {
    // toMatchInlineSnapshot
    // console.log(wrapper.html())
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should display all 4 options correctly', () => {
    const liTags = wrapper.findAll('li');
    expect(liTags.length).toBe(4);

    expect(liTags[0].text()).toBe(pokemons[0].name);
    expect(liTags[1].text()).toBe(pokemons[1].name);
    expect(liTags[2].text()).toBe(pokemons[2].name);
    expect(liTags[3].text()).toBe(pokemons[3].name);
  });

  test('should emit "selection" with its respective parameters when clicking', () => {
    const [li1, li2, li3, li4] = wrapper.findAll('li');

    li1.trigger('click');
    li2.trigger('click');
    li3.trigger('click');
    li4.trigger('click');

    expect(wrapper.emitted('pokemonSelected').length).toBe(4);
    expect(wrapper.emitted('pokemonSelected')[0]).toEqual([5]);
    expect(wrapper.emitted('pokemonSelected')[1]).toEqual([10]);
    expect(wrapper.emitted('pokemonSelected')[2]).toEqual([15]);
    expect(wrapper.emitted('pokemonSelected')[3]).toEqual([20]);
  });
});
