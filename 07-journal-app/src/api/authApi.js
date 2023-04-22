import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  params: {
    key: 'AIzaSyDCDbLeuh6Xy1k718eqZmGzvmXjF53eCDo',
  },
});

// console.log( process.env.NODE_ENV ) // TEST durante testing,

export default authApi;
