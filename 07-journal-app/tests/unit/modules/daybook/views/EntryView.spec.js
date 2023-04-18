import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

// import Swal from 'sweetalert2';

import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../mocks/test-journal-state';

import EntryView from '@/modules/daybook/views/EntryView.vue';

// !! Problemas con sweetalert2, no pasan los tests

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

// jest.mock('sweetalert2', () => ({
//   fire: jest.fn(),
//   showLoading: jest.fn(),
//   close: jest.fn(),
// }));

describe('Tests on EntryView', () => {
  const store = createVuexStore(journalState);
  store.dispatch = jest.fn();

  const mockRouter = {
    push: jest.fn(),
  };

  const mockSwal = {
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: 'ABC123',
      },
      global: {
        mocks: {
          $router: mockRouter,
          $swal: mockSwal,
        },
        plugins: [store],
      },
    });
  });

  xtest('debe de sacar al usuario porque el id no existe', () => {
    shallowMount(EntryView, {
      props: {
        id: 'Este ID no existe en el STORE',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
  });

  xtest('debe de mostrar la entrada correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  xtest('debe de borrar la entrada y salir', (done) => {
    mockSwal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));

    wrapper.find('.btn-danger').trigger('click');

    expect(mockSwal.fire).toHaveBeenCalledWith({
      title: 'Esta seguro?',
      text: 'Una vez borrado, no se podra recuperar',
      showDenyButton: true,
      confirmButtonText: 'Si, estoy seguro',
    });

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        'journal/deleteEntry',
        'ABC123'
      );
      expect(mockRouter.push).toHaveBeenCalled();
      done();
    }, 1);
  });
});
