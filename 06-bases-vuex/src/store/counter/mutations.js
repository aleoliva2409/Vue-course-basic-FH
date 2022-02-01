export default {
  increment(state) {
    state.count++;
    state.lastMutation = 'increment';
  },
  incrementBy(state, value) {
    (state.count += value), (state.lastMutation = 'incrementBy');
  },
  setLoading(state, value) {
    state.isLoading = value;
  },
};

// const increment = (state) => {
//   state.count++;
//   state.lastMutation = 'increment';
// }
// const incrementBy = (state, value) => {
//   (state.count += value), (state.lastMutation = 'incrementBy');
// }
// const setLoading = (state, value) => {
//   state.isLoading = value;
// },

// export {
//   increment,
//   incrementBy,
//   setLoading
// }