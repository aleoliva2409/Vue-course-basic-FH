import { shallowMount } from '@vue/test-utils';
import About from '@/views/About';

describe('Tests on AboutView', () => {
  test('should render correctly', () => {
    const wrapper = shallowMount(About);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
