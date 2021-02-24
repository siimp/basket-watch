import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios'
import * as bulmaToast from 'bulma-toast'
import store from '../store'

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
          store.dispatch('setBasket', response.data)
          store.dispatch('addBookmark', to.params.uuid)
          next()
        })
        .catch((error) => {
          bulmaToast.toast({
            message: `Failed to open basket ${to.params.uuid} - ${error.response ? error.response.statusText : error}`,
            type: 'is-danger'
          })

          if (error.response && error.response.status === 404) {
            store.dispatch('deleteBookmark', to.params.uuid)
          }

          next('/')
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
    path: '/basket/:uuid/notification',
    name: 'Notification',
    component: () => import('../notification/views/Notification.vue'),
    meta: { flowOrder: 3 }
  },
  {
    path: '/basket/:uuid/notification/unsubscribe',
    name: 'NotificationUnsubscribe',
    component: () => import('../notification/views/Unsubscribe.vue')
  },
  {
    path: '/baskets',
    name: 'Baskets',
    component: () => import('../basket/views/Baskets.vue'),
    meta: { flowOrder: 2 }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
