import state from './state'
// import * as mutations from './mutations'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'


const counterStore = {
  namespaced: true,
  state,
  // ? solo pueden ser sincronas
  mutations,
  // ? pueden ser asyncronas
  actions,
  getters,
}

export default counterStore