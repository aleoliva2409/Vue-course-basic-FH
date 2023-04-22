import { shallowMount } from '@vue/test-utils';

import NavBar from '@/modules/daybook/components/NavBar.vue';
import createVuexStore from '../../../mocks/mock-store';

// ?? hacer la configuración individual en el archivo si se trabaja con options api y composition api porque si se hace esta configuración global rompe el router del options api
// import {
//   VueRouterMock,
//   createRouterMock,
//   injectRouterMock,
// } from 'vue-router-mock';
// import { config } from '@vue/test-utils';

// const router = createRouterMock();
// beforeEach(() => {
//   injectRouterMock(router);
// });

// config.plugins.VueWrapper.install(VueRouterMock);

describe('Tests Navbar component', () => {
  const store = createVuexStore({
    user: {
      name: 'Alejandro Oliva',
      email: 'ale@gmail.com',
    },
    status: 'authenticated',
    idToken: 'ABC',
    refreshToken: 'XYZ',
  });

  beforeEach(() => jest.clearAllMocks());

  test('should show component', () => {
    const wrapper = shallowMount(NavBar, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should redirect and logout when button is clicked', async () => {
    const wrapper = shallowMount(NavBar, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.router.push).toHaveBeenCalledWith({ name: 'login' });

    expect(store.state.auth).toEqual({
      user: null,
      status: 'not-authenticated',
      idToken: null,
      refreshToken: null,
    });
  });
});
