import { shallowMount } from '@vue/test-utils';
import Login from '@/modules/auth/views/Login.vue';

import createVuexStore from '../../../mocks/mock-store';

import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe('Tests on Login Component', () => {
  const store = createVuexStore({
    status: 'not-authenticated', // 'authenticated','not-authenticated', 'authenticating'
    user: null,
    idToken: null,
    refreshToken: null,
  });

  store.dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should match with snapshot', () => {
    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('wrong creds, show SWAL', async () => {
    store.dispatch.mockReturnValueOnce({
      ok: false,
      message: 'Error en credenciales',
    });

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find('form').trigger('submit');
    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', {
      email: '',
      password: '',
    });
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Error en credenciales',
      'error'
    );
  });

  test('should redirect to no-entry route', async () => {
    store.dispatch.mockReturnValueOnce({ ok: true });

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
      },
    });

    const [txtEmail, txtPassword] = wrapper.findAll('input');
    await txtEmail.setValue('fernando@gmail.com');
    await txtPassword.setValue('123456');

    await wrapper.find('form').trigger('submit');

    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', {
      email: 'fernando@gmail.com',
      password: '123456',
    });
    expect(wrapper.router.push).toHaveBeenCalledWith({ name: 'no-entry' });
  });
});
