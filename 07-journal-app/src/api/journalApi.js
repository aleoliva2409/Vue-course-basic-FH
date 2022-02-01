import axios from "axios";

const journalApi = axios.create({
  baseURL: 'https://vue-journal-vuex-default-rtdb.firebaseio.com'
})

export default journalApi