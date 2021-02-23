import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.scss'
import * as bulmaToast from 'bulma-toast'

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/]

bulmaToast.setDefaults({
  duration: 3000,
  position: 'top-right',
  closeOnClick: false,
  type: 'is-success',
  dismissible: true
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
