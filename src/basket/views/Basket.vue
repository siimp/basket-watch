<template>
  <div>
    <div class="header">
      <div class="header-left">
        <span>
          <a href="#" v-on:click="menuOpen = !menuOpen">
            <ion-icon v-if="!menuOpen" name="menu-sharp"></ion-icon>
            <ion-icon v-if="menuOpen" name="close-sharp"></ion-icon>
          </a>
        </span>
        <span class="title is-4">
          <router-link to="/">Basket Watch</router-link>
        </span>
      </div>
      <div class="header-right">
        <router-link :to="'/basket/' + this.$route.params.uuid + '/notification'">
          <ion-icon name="notifications-sharp"></ion-icon>
        </router-link>
      </div>
    </div>
    <div v-show="menuOpen" class="card">
      <div class="card-content">
        <div class="content">
          <div class="menu">
            <div class="menu-list">
              <div>
                <a href="#" v-on:click="deleteBasket">
                  <ion-icon name="trash-outline"></ion-icon>
                  Delete
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr/>
    <div class="section">
      <table class="table is-striped">
        <tfoot>
          <tr>
            <th>
              <div class="columns">
                <div class="column is-7"><span class="nowrap">Total: <span class="value" v-bind:class="{ 'has-text-success': total === min, 'has-text-danger': total == max }">{{ total }} €</span></span></div>
                <div class="column"><span class="nowrap">Min/Max: <span class="value">{{ min }} € / {{ max }} €</span></span></div>
              </div>
            </th>
            <th></th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="(basketItem, basketItemIndex) in basketItems" :key="basketItem.id">
            <td>
              <div class="columns">
                <div class="column is-5"><a :href="basketItem.item.url">{{ basketItem.item.name.substring(0, 50) }}</a></div>
                <div class="column is-2"><span class="nowrap">Price: <span v-bind:class="{ 'has-text-success': basketItem.item.priceHistory.price === basketItem.item.priceHistory.priceMin, 'has-text-danger': basketItem.item.priceHistory.price === basketItem.item.priceHistory.priceMax }">{{ basketItem.item.priceHistory.price }} €</span></span></div>
                <div class="column"><span class="nowrap">Min/Max: {{ basketItem.item.priceHistory.priceMin }} € / {{ basketItem.item.priceHistory.priceMax }} €</span></div>
                <div class="column quantity"><span class="nowrap">Quantity: {{ basketItem.quantity }}</span></div>
              </div>
            </td>
            <td>
              <ion-icon name="close-circle-outline" size="small" @click="deleteBasketItem(basketItem, basketItemIndex)"></ion-icon>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bottom-button max-width">
      <button class="button is-success max-width" @click="add">Add new item</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

function refreshData (vm) {
  axios.get(process.env.VUE_APP_API_ENDPOINT + '/basket/' + vm.$route.params.uuid)
    .then(response => {
      vm.basketItems = response.data.basketItems
      vm.total = response.data.priceHistory.price
      vm.min = response.data.priceHistory.priceMin
      vm.max = response.data.priceHistory.priceMax
      vm.willBeDeletedAt = response.data.willBeDeletedAt
    })
}

export default {
  data () {
    return {
      basketItems: this.$route.meta.response.basketItems,
      total: this.$route.meta.response.priceHistory.price,
      min: this.$route.meta.response.priceHistory.priceMin,
      max: this.$route.meta.response.priceHistory.priceMax,
      willBeDeletedAt: this.$route.meta.response.willBeDeletedAt,
      menuOpen: false
    }
  },
  methods: {
    add: function () {
      this.$router.push('/basket/' + this.$route.params.uuid + '/basket-item')
    },
    copyUrlToClipboard: function () {
      var dummy = document.createElement('input')
      document.body.appendChild(dummy)
      dummy.value = window.location.href
      dummy.select()
      document.execCommand('copy')
      document.body.removeChild(dummy)
    },
    deleteBasketItem: function (basketItem, basketItemIndex) {
      axios.delete(process.env.VUE_APP_API_ENDPOINT + '/basket/' + this.$route.params.uuid + '/basket-item/' + basketItem.id)
        .then(response => {
          refreshData(this)
        })
    },
    refreshWillBeDeletedAt: function () {
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/basket/' + this.$route.params.uuid + '/refresh')
        .then(response => {
          refreshData(this)
        })
    },
    deleteBasket: function () {
      axios.delete(process.env.VUE_APP_API_ENDPOINT + '/basket/' + this.$route.params.uuid)
        .then(response => {
          this.$router.push('/')
        })
    }
  }
}
</script>

<style scoped>
.header {
  font-size: 1.5em;
}
.header-left {
  text-align: left;
  width: 70%;
  display: inline-block;
  padding: 0.5em;
}
.header-right {
  text-align: right;
  width: 30%;
  display: inline-block;
  padding: 0.5em;
}
.header-right a {
  margin-left: 1em;
}
.header a:link {
    text-decoration: inherit;
    color: inherit;
    cursor: auto;
}
.header a:visited {
    text-decoration: inherit;
    color: inherit;
    cursor: auto;
}
.header span.title {
    bottom: 4px;
    position: relative;
    margin-left: 0.5em;
}
.card {
    position: absolute;
    width: 80%;
    min-height: 50%;
    z-index: 1;
}
hr {
  margin-top: 0;
}
.max-width {
  width: 100%
}
.bottom-button {
  position: fixed;
  bottom: 0px;
}
.nowrap {
  white-space: nowrap;
}
tbody tr td {
  vertical-align: middle;
}
tbody tr td ion-icon {
  display: block;
}
.quantity {
  text-align: right;
}
th .value {
  font-weight: normal;
}
.column {
  padding: 0;
}
.columns {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}
.section {
  padding-top: 1em;
}
table {
  width: 100%;
}
</style>
