import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as bulmaToast from 'bulma-toast'

Vue.use(Vuex)

const EMPTY_BASKET = {
  uuid: '',
  priceHistory: {},
  basketItems: [],
  willBeDeletedAt: '',
  notification: {}
}

const store = new Vuex.Store({
  state: {
    basket: Object.assign({}, EMPTY_BASKET)
  },
  mutations: {
    _setBasket (state, basket) {
      state.basket = Object.assign({}, EMPTY_BASKET, basket)
    },
    _setNotification (state, notification) {
      state.basket.notification = notification
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
    deleteBasket (context, uuid) {
      axios.delete(process.env.VUE_APP_API_ENDPOINT + '/basket/' + uuid)
        .then(() => {
          context.commit('_deleteBookmark', uuid)
          context.commit('_setBasket', {})
        })
        .catch((error) => {
          bulmaToast.toast({
            message: `Failed to delete basket ${uuid} - ${error.response ? error.response.statusText : error}`,
            type: 'is-danger'
          })
        })
    },
    createNewBasket (context) {
      context.commit('_setBasket', {})
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
  }
})

const bookmarksModule = {
  state: {
    bookmarks: []
  },
  mutations: {
    _setBookmarks (state, bookmarks) {
      state.bookmarks = Object.assign([], bookmarks)
    },
    _addBookmark (state, uuid) {
      if (state.bookmarks.indexOf(uuid) === -1) {
        state.bookmarks.push(uuid)
        bulmaToast.toast({ message: 'Added basket to bookmarks' })
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
    setBookmarks (context, bookmarks) {
      context.commit('_setBookmarks', bookmarks)
    },
    addBookmark (context, uuid) {
      context.commit('_addBookmark', uuid)
    },
    deleteBookmark (context, uuid) {
      context.commit('_deleteBookmark', uuid)
    }
  }
}

store.registerModule('bookmarks', bookmarksModule)

const LOCAL_STORAGE_KEY_BASKETS = 'baskets'

function saveToLocalStorage (bookmarks) {
  localStorage.setItem(LOCAL_STORAGE_KEY_BASKETS, JSON.stringify(bookmarks))
}

const basketsFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY_BASKETS)
if (basketsFromLocalStorage) {
  store.dispatch('setBookmarks', JSON.parse(basketsFromLocalStorage))
}

export default store
