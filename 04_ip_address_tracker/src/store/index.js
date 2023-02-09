import { createStore } from 'vuex'


export default createStore({
  state: {
    queryIP: {
      value: ''
    },
  },
  getters: {
    getQueryIP( state ){
      return state.queryIP
    },

  },
  mutations: {
    setQueryIP( state, data ){
      const update = Object.assign({}, state.queryIP ,data)
      state.queryIP = update
    }
  },
  actions: {
  },
  modules: {
  }
})
