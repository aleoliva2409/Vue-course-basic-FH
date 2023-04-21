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
    const { id, text, date, picture } = entry;
    const dataToUpdate = {
      text,
      date,
      picture,
    };

    await journalApi.put(`/entries/${id}.json`, dataToUpdate);
    // const { id, ...rest } = entry;
    // await journalApi.put(`/entries/${id}.json`, { ...rest });

    commit('updateEntry', { ...dataToUpdate, id: entry.id });
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

export const deleteEntry = async ({ commit }, id) => {
  try {
    await journalApi.delete(`/entries/${id}.json`);

    commit('deleteEntry', id);
  } catch (error) {
    console.log(error);
  }
};
