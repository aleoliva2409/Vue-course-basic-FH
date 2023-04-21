import { createStore } from 'vuex';
import journalModule from '@/modules/daybook/store';
import authModule from '@/modules/auth/store';

const store = createStore({
  modules: {
    journal: journalModule,
    auth: authModule,
  },
});

export default store;
