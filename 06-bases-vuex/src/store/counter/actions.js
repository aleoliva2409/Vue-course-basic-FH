import getRandomInt from '@/helpers/getRandomInt'

export default {
  // async incrementRandomInt(context) {
  async incrementRandomInt({ commit }) {
    commit('setLoading', true);
    const randomInt = await getRandomInt();
    commit('incrementBy', randomInt);
    commit('setLoading', false);
  },
};
