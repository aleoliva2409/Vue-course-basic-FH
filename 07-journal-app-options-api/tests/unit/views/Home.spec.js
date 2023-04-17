import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home';

describe('Tests on HomeView', () => {
  test('should render correctly', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should redirect to no-entry when button is clicked', () => {
    const mockRouter = {
      push: jest.fn(),
    };

    // ? se puede mockear las variables de VUE como $event, $router, $emit
    const wrapper = shallowMount(Home, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    wrapper.find('button').trigger('click');

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
  });
});
