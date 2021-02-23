import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basket: {
      uuid: '',
      notification: {
        email: ''
      }
    }
  },
  mutations: {
    _setBasket (state, basket) {
      state.basket = basket
    }
  },
  actions: {
    fetchByUuid (context, uuid) {
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/basket/' + uuid)
        .then(response => {
          context.commit('_setBasket', response.data)
        })
    },
    setBasket (context, basket) {
      context.commit('_setBasket', basket)
    }
  },
  modules: {
  }
})
