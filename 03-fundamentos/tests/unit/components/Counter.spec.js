import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter.vue';

describe('Counter component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  test('should match with snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('h2 should have default value', () => {
    expect(wrapper.find('h2').exists()).toBeTruthy();

    const h2Value = wrapper.find('h2').text();

    expect(h2Value).toBe('Counter');
  });

  test('default value should be 50 in p element', () => {
    // const elements = wrapper.findAll('p');
    const value = wrapper.find('[data-testid="counter"]').text();

    expect(value).toBe('50');
  });

  test('should increment and decrement counter value', async () => {
    const decrementBtn = wrapper.find('[data-decrement="decrement"]');
    const incrementBtn = wrapper.find('[data-increment="increment"]');

    await incrementBtn.trigger('click');

    let value = wrapper.find('[data-testid="counter"]').text();

    expect(value).toBe('51');

    await decrementBtn.trigger('click');
    await decrementBtn.trigger('click');

    // ? read value again because that varialbe is no reactive
    value = wrapper.find('[data-testid="counter"]').text();

    expect(value).toBe('49');
  });

  test('should set the default value ', () => {
    // ? read component props
    const { start } = wrapper.props();

    const value = wrapper.find('[data-testid="counter"]').text();

    expect(Number(value)).toBe(start);
  });

  test('should show title prop', () => {
    const title = 'Vamos los pibes';

    const wrapper = shallowMount(Counter, {
      props: {
        title,
      },
    });

    const titleValue = wrapper.find('h2').text();

    expect(titleValue).toBe(title);
  });
});
