import axios from 'axios';
import createVuexStore from '../../../mocks/mock-store';

describe('Vuex: Tests on auth-module', () => {
  test('initial state', () => {
    const store = createVuexStore({
      status: 'authenticating', // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe('authenticating');
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });

  // Mutations
  test('Mutation: loginUser', () => {
    const store = createVuexStore({
      status: 'authenticating', // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const payload = {
      user: { name: 'Alejandro', email: 'ale@gmail.com' },
      idToken: 'ABC-123',
      refreshToken: 'XYZ-123',
    };

    store.commit('auth/loginUser', payload);

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe('authenticated');
    expect(user).toEqual({ name: 'Alejandro', email: 'ale@gmail.com' });
    expect(idToken).toBe('ABC-123');
    expect(refreshToken).toBe('XYZ-123');
  });

  test('Mutation: logout', () => {
    localStorage.setItem('idToken', 'ABC-123');
    localStorage.setItem('refreshToken', 'XYZ-123');

    const store = createVuexStore({
      status: 'authenticated', // 'authenticated','not-authenticated', 'authenticating'
      user: { name: 'Alejandro', email: 'ale@gmail.com' },
      idToken: 'ABC-123',
      refreshToken: 'XYZ-456',
    });

    store.commit('auth/logout');

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe('not-authenticated');
    expect(user).toBe(null);
    expect(user).toBeFalsy();
    expect(idToken).toBeFalsy();
    expect(refreshToken).toBeFalsy();

    expect(localStorage.getItem('idToken')).toBeFalsy();
    expect(localStorage.getItem('refreshToken')).toBeFalsy();
  });

  // Getters
  test('Getter: username currentState', () => {
    const store = createVuexStore({
      status: 'authenticated', // 'authenticated','not-authenticated', 'authenticating'
      user: { name: 'Alejandro', email: 'ale@gmail.com' },
      idToken: 'ABC-123',
      refreshToken: 'XYZ-456',
    });

    expect(store.getters['auth/currentState']).toBe('authenticated');
    expect(store.getters['auth/username']).toBe('Alejandro');
  });

  // Actions
  test('Actions: createUser - Error user already exist', async () => {
    const store = createVuexStore({
      status: 'not-authenticated', // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: 'Test User',
      email: 'test@test.com',
      password: '123456',
    };

    const resp = await store.dispatch('auth/createUser', newUser);
    expect(resp).toEqual({ ok: false, message: 'EMAIL_EXISTS' });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe('not-authenticated');
    expect(user).toBeFalsy();
    expect(idToken).toBeFalsy();
    expect(refreshToken).toBeFalsy();
  });

  test('Actions: createUser signInUser - Create user', async () => {
    const store = createVuexStore({
      status: 'not-authenticated', // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: 'Test User 2',
      email: 'test2@test.com',
      password: '123456',
    };
    // SignIn
    await store.dispatch('auth/signInUser', { ...newUser });
    const { idToken } = store.state.auth;

    // Borrar el usuario
    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDCDbLeuh6Xy1k718eqZmGzvmXjF53eCDo`,
      {
        idToken,
      }
    );

    // Crear el usuario
    const resp = await store.dispatch('auth/createUser', { ...newUser });
    expect(resp).toEqual({ ok: true });

    const { status, user, idToken: token, refreshToken } = store.state.auth;

    expect(status).toBe('authenticated');
    expect(user).toMatchObject({
      name: 'Test User 2',
      email: 'test2@test.com',
    });
    expect(typeof token).toBe('string');
    expect(typeof refreshToken).toBe('string');
  });

  test('Actions: checkAuthentication - SUCCESS', async () => {
    const store = createVuexStore({
      status: 'not-authenticated', // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    // SignIn
    await store.dispatch('auth/signInUser', {
      email: 'test@test.com',
      password: '123456',
    });
    const { idToken } = store.state.auth;
    store.commit('auth/logout');

    localStorage.setItem('idToken', idToken);

    const checkResp = await store.dispatch('auth/checkAuthentication');
    const { status, user, idToken: token } = store.state.auth;

    expect(checkResp).toEqual({ ok: true });

    expect(status).toBe('authenticated');
    expect(user).toMatchObject({ name: 'Test User', email: 'test@test.com' });
    expect(typeof token).toBe('string');
  });

  test('Actions:checkAuthentication - NEGATIVE', async () => {
    const store = createVuexStore({
      status: 'authenticating', // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null,
    });

    localStorage.removeItem('idToken');
    const checkResp1 = await store.dispatch('auth/checkAuthentication');
    expect(checkResp1).toEqual({ ok: false, message: 'No hay token' });
    expect(store.state.auth.status).toBe('not-authenticated');

    localStorage.setItem('idToken', 'ABC-123');
    const checkResp2 = await store.dispatch('auth/checkAuthentication');
    expect(checkResp2).toEqual({ ok: false, message: 'INVALID_ID_TOKEN' });
    expect(store.state.auth.status).toBe('not-authenticated');
  });
});
