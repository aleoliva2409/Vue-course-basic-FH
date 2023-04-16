import journalApi from '@/api/journalApi';
// export const actions = async ({ commit }) => {

// }

export const loadEntries = async ({ commit }) => {
  try {
    const { data } = await journalApi.get('/entries.json');

    if (!data) return commit('setEntries', []);

    const entries = [];
    for (let id of Object.keys(data)) {
      entries.push({
        id,
        ...data[id],
      });
    }

    commit('setEntries', entries);
  } catch (error) {
    console.log(error);
  }
};

export const updateEntry = async ({ commit }, entry) => {
  try {
    // const {id, text, date, picture} = entry
    // const { data } = await journalApi.put(`/entries/${id}`, {
    //   text,
    //   date,
    //   picture,
    // });
    const { id, ...rest } = entry;
    await journalApi.put(`/entries/${id}.json`, { ...rest });

    commit('updateEntry', { ...entry });
  } catch (error) {
    console.log(error);
  }
};

export const createEntry = async ({ commit }, entry) => {
  try {
    const { text, date, picture } = entry;

    const { data } = await journalApi.post('/entries.json', {
      text,
      date,
      picture,
    });

    commit('addEntry', { text, date, picture, id: data.name });

    return data.name; // ? id
  } catch (error) {
    console.log(error);
  }
};

export const deleteEntryById = async ({ commit }, id) => {
  try {
    await journalApi.delete(`/entries/${id}.json`);

    commit('removeEntry', id);
  } catch (error) {
    console.log(error);
  }
};
