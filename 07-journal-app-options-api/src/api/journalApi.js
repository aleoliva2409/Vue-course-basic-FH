import axios from 'axios';

const journalApi = axios.create({
  baseURL: 'https://journal-app-backend-2023-default-rtdb.firebaseio.com/',
});

export default journalApi;
