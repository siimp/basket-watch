import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home,
    meta: { flowOrder: 1 }
  },
  {
    path: '/basket/:uuid',
    name: 'Basket',
    component: () => import('../basket/views/Basket.vue'),
    meta: { flowOrder: 2 },
    beforeEnter: (to, from, next) => {
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/basket/' + to.params.uuid)
        .then(response => {
          to.meta.response = response.data
          next()
          addToLocalStorage(to.params.uuid)
        })
        .catch(() => {
          next('/')
          removeFromLocalStorage(to.params.uuid)
        })
    }
  },
  {
    path: '/basket/:uuid/basket-item',
    name: 'BasketItem',
    component: () => import('../basketItem/views/BasketItem.vue'),
    meta: { flowOrder: 3 }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const LOCAL_STORAGE_KEY_BASKETS = 'baskets'

function addToLocalStorage (uuid) {
  let baskets = []
  const basketsFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY_BASKETS)
  if (basketsFromLocalStorage) {
    baskets = JSON.parse(basketsFromLocalStorage)
  }
  if (baskets.indexOf(uuid) === -1) {
    baskets.push(uuid)
    localStorage.setItem(LOCAL_STORAGE_KEY_BASKETS, JSON.stringify(baskets))
  }
}

function removeFromLocalStorage (uuid) {
  const basketsFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY_BASKETS)
  if (basketsFromLocalStorage) {
    const baskets = JSON.parse(basketsFromLocalStorage)
    if (baskets.indexOf(uuid) > -1) {
      baskets.splice(baskets.indexOf(uuid), 1)
      localStorage.setItem(LOCAL_STORAGE_KEY_BASKETS, JSON.stringify(baskets))
    }
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
