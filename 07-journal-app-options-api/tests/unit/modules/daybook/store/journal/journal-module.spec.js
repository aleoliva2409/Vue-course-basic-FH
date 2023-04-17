import { createStore } from 'vuex';
import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../../mocks/test-journal-state';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe('Vuex - Tests on Journal Module', () => {
  // Basicas ==================
  test('should show initial state', () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  // Mutations ==================
  test('mutation: setEntries', () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    store.commit('journal/setEntries', journalState.entries);
    expect(store.state.journal.entries.length).toBe(2);

    store.commit('journal/setEntries', journalState.entries);
    expect(store.state.journal.entries.length).toBe(4);

    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test('mutation: updateEntry', () => {
    const store = createVuexStore(journalState);
    const updatedEntry = {
      id: '-MfKM3yA5ij3hnmLFfqv',
      date: 1627077227978,
      text: 'Hola mundo desde pruebas',
    };

    store.commit('journal/updateEntry', updatedEntry);

    const entries = store.state.journal.entries;

    expect(entries.length).toBe(2);
    expect(entries.find((e) => e.id === updatedEntry.id)).toEqual(updatedEntry);
  });

  test('mutation: addEntry/deleteEntry', () => {
    const store = createVuexStore(journalState);

    const newEntry = {
      id: 'ABC-123',
      text: 'Hola mundo',
      date: 1627077227978,
    };

    store.commit('journal/addEntry', newEntry);

    let entries = store.state.journal.entries;

    expect(entries.length).toBe(3);
    expect(entries.find((e) => e.id === 'ABC-123')).toBeTruthy();

    store.commit('journal/deleteEntry', 'ABC-123');

    entries = store.state.journal.entries;

    expect(entries.length).toBe(2);
    expect(entries.find((e) => e.id === 'ABC-123')).toBeFalsy();
  });

  // Getters ==================
  test('getters: getEntries getEntryById', () => {
    const store = createVuexStore(journalState);

    const [entry1, entry2] = journalState.entries;

    expect(store.getters['journal/getEntries']('').length).toBe(2);
    expect(store.getters['journal/getEntries']('segunda').length).toBe(1);

    expect(store.getters['journal/getEntries']('segunda')).toEqual([entry2]);

    expect(
      store.getters['journal/getEntryById']('-MfKM3yA5ij3hnmLFfqv')
    ).toEqual(entry1);
  });

  // Actions ==================
  test('actions: loadEntries', async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    await store.dispatch('journal/loadEntries');

    expect(store.state.journal.entries.length).toBe(3);
  });

  test('actions: updateEntry', async () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: 'ABC123',
      date: 1627077227978,
      text: 'Hola mundo desde firebase data',
      otherField: true,
      field: { a: 1 },
    };

    await store.dispatch('journal/updateEntry', updatedEntry);

    expect(store.state.journal.entries.length).toBe(2);

    expect(
      store.state.journal.entries.find((e) => e.id === updatedEntry.id)
    ).toEqual({
      id: 'ABC123',
      date: 1627077227978,
      text: 'Hola mundo desde firebase data',
    });
  });

  test('actions: createEntry deleteEntry', async () => {
    const store = createVuexStore(journalState);

    const newEntry = {
      date: 1627077227978,
      text: 'Nueva entrada desde las pruebas',
    };

    const id = await store.dispatch('journal/createEntry', newEntry);

    expect(typeof id).toBe('string');

    expect(store.state.journal.entries.find((e) => e.id === id)).toBeTruthy();

    await store.dispatch('journal/deleteEntry', id);

    expect(store.state.journal.entries.find((e) => e.id === id)).toBeFalsy();
  });
});
