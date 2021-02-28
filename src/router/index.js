import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
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
    meta: { flowOrder: 3 }
  },
  {
    path: '/basket/:uuid/basket-item',
    name: 'BasketItem',
    component: () => import('../basketItem/views/BasketItem.vue'),
    meta: { flowOrder: 4 }
  },
  {
    path: '/basket/:uuid/notification',
    name: 'Notification',
    component: () => import('../notification/views/Notification.vue'),
    meta: { flowOrder: 4 }
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

router.beforeEach((to, from, next) => {
  if ((!store.state.basket.uuid || store.state.basket.uuid === '') && to.params.uuid) {
    store.dispatch('fetchBasketByUuid', to.params.uuid)
      .then(() => {
        next()
      })
      .catch(() => {
        next('/')
      })
  } else {
    next()
  }
})

export default router
