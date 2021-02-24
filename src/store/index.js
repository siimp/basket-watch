import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as bulmaToast from 'bulma-toast'

Vue.use(Vuex)

const EMPTY_STATE = {
  bookmarks: [],
  basket: {
    uuid: '',
    notification: {
      email: '',
      subscribed: null
    },
    priceHistory: {}
  }
}

const store = new Vuex.Store({
  state: Object.assign({}, EMPTY_STATE),
  mutations: {
    _setBasket (state, basket) {
      state.basket = Object.assign({}, EMPTY_STATE, basket)
    },
    _setNotification (state, notification) {
      state.basket.notification = Object.assign({}, state.basket.notification, notification)
    },
    _setBookmarks (state, bookmarks) {
      if (!bookmarks) {
        state.bookmarks = []
      } else {
        state.bookmarks = bookmarks
      }
    },
    _addBookmark (state, uuid) {
      if (state.bookmarks.indexOf(uuid) === -1) {
        state.bookmarks.push(uuid)
      }
      saveToLocalStorage(state.bookmarks)
    },
    _deleteBookmark (state, uuid) {
      if (state.bookmarks.indexOf(uuid) > -1) {
        state.bookmarks.splice(state.bookmarks.indexOf(uuid), 1)
      }
      saveToLocalStorage(state.bookmarks)
    }
  },
  actions: {
    fetchBasketByUuid (context, uuid) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/basket/' + uuid)
          .then(response => {
            context.commit('_setBasket', response.data)
            context.commit('_addBookmark', uuid)
            resolve()
          })
          .catch((error) => {
            bulmaToast.toast({
              message: `Failed to open basket ${uuid} - ${error.response ? error.response.statusText : error}`,
              type: 'is-danger'
            })

            if (error.response && error.response.status === 404) {
              context.commit('_deleteBookmark', uuid)
            }
            reject(error)
          })
      })
    },
    setBasket (context, basket) {
      context.commit('_setBasket', basket)
    },
    createNewBasket (context) {
      context.commit('_setBasket', {})
    },
    setBookmarks (context, bookmarks) {
      context.commit('_setBookmarks', bookmarks)
    },
    addBookmark (context, uuid) {
      context.commit('_addBookmark', uuid)
    },
    deleteBookmark (context, uuid) {
      context.commit('_deleteBookmark', uuid)
    },
    subscribeNotifications (context, email) {
      axios.post(process.env.VUE_APP_API_ENDPOINT + '/basket/' + this.state.basket.uuid + '/notification', { email: email })
        .then(() => {
          bulmaToast.toast({ message: 'Subscription successful' })
          context.commit('_setNotification', { email: email, subscribed: true })
        })
        .catch((error) => {
          bulmaToast.toast({
            message: `Failed to subscribe - ${error.response ? error.response.statusText : error}`,
            type: 'is-danger'
          })
        })
    },
    unsubscribeNotifications (context) {
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/basket/' + this.state.basket.uuid + '/notification/unsubscribe')
        .then(() => {
          bulmaToast.toast({ message: 'Unsubscription successful' })
          context.commit('_setNotification', { subscribed: false })
        })
        .catch((error) => {
          bulmaToast.toast({
            message: `Failed to unsubscribe - ${error.response ? error.response.statusText : error}`,
            type: 'is-danger'
          })
        })
    }
  },
  modules: {
  }
})

const LOCAL_STORAGE_KEY_BASKETS = 'baskets'

function saveToLocalStorage (bookmarks) {
  localStorage.setItem(LOCAL_STORAGE_KEY_BASKETS, JSON.stringify(bookmarks))
}

const basketsFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY_BASKETS)
if (basketsFromLocalStorage) {
  store.dispatch('setBookmarks', JSON.parse(basketsFromLocalStorage))
}

export default store
