import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    bookmarks: [],
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
    fetchByUuid (context, uuid) {
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/basket/' + uuid)
        .then(response => {
          context.commit('_setBasket', response.data)
        })
    },
    setBasket (context, basket) {
      context.commit('_setBasket', basket)
    },
    setBookmarks (context, bookmarks) {
      context.commit('_setBookmarks', bookmarks)
    },
    addBookmark (context, uuid) {
      context.commit('_addBookmark', uuid)
    },
    deleteBookmark (context, uuid) {
      context.commit('_deleteBookmark', uuid)
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
