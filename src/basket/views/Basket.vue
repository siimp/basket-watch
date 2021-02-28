<template>
  <div>
    <div class="header">
      <div class="header-left">
        <span>
          <a href="#" v-on:click="menuOpen = !menuOpen">
            <ion-icon class="is-clickable" v-if="!menuOpen" name="menu-sharp"></ion-icon>
            <ion-icon class="is-clickable" v-if="menuOpen" name="close-sharp"></ion-icon>
          </a>
        </span>
        <span class="title is-4">
          <router-link class="is-clickable" to="/">Basket Watch</router-link>
        </span>
      </div>
      <div class="header-right">
        <router-link :to="'/basket/' + this.$route.params.uuid + '/notification'">
          <ion-icon class="is-clickable" name="notifications-sharp"></ion-icon>
        </router-link>
      </div>
    </div>
    <div v-show="menuOpen" class="card">
      <div class="card-content">
        <div class="content">
          <div class="menu">
            <div class="menu-list">
              <div>
                <router-link :to="'/baskets'">
                  <ion-icon class="is-clickable" name="bookmark-outline"></ion-icon>
                  Bookmarks
                </router-link>
              </div>
              <div>
                <a href="#" class="has-text-danger" v-on:click="deleteBasket">
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
                <div class="column is-7"><span class="nowrap">Total: <span class="value" v-bind:class="{ 'has-text-success': this.$store.state.basket.priceHistory.price === this.$store.state.basket.priceHistory.priceMin, 'has-text-danger': this.$store.state.basket.priceHistory.price == this.$store.state.basket.priceHistory.priceMax }">{{ this.$store.state.basket.priceHistory.price }} €</span></span></div>
                <div class="column"><span class="nowrap">Min/Max: <span class="value">{{ this.$store.state.basket.priceHistory.priceMin }} € / {{ this.$store.state.basket.priceHistory.priceMax }} €</span></span></div>
              </div>
            </th>
            <th></th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="basketItem in this.$store.state.basket.basketItems" :key="basketItem.id">
            <td>
              <div class="columns">
                <div class="column is-5"><a :href="basketItem.item.url">{{ basketItem.item.name.substring(0, 50) }}</a></div>
                <div class="column is-2"><span class="nowrap">Price: <span v-bind:class="{ 'has-text-success': basketItem.item.priceHistory.price === basketItem.item.priceHistory.priceMin, 'has-text-danger': basketItem.item.priceHistory.price === basketItem.item.priceHistory.priceMax }">{{ basketItem.item.priceHistory.price }} €</span></span></div>
                <div class="column"><span class="nowrap">Min/Max: {{ basketItem.item.priceHistory.priceMin }} € / {{ basketItem.item.priceHistory.priceMax }} €</span></div>
                <div class="column quantity"><span class="nowrap">Quantity: {{ basketItem.quantity }}</span></div>
              </div>
            </td>
            <td>
              <ion-icon class="is-clickable" name="trash-outline" @click="deleteBasketItem(basketItem)"></ion-icon>
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

export default {
  data () {
    return {
      menuOpen: false
    }
  },
  methods: {
    add () {
      this.$router.push('/basket/' + this.$route.params.uuid + '/basket-item')
    },
    deleteBasketItem (basketItem) {
      axios.delete(process.env.VUE_APP_API_ENDPOINT + '/basket/' + this.$route.params.uuid + '/basket-item/' + basketItem.id)
        .then(() => {
          this.$store.dispatch('fetchBasketByUuid', this.$route.params.uuid)
        })
    },
    deleteBasket () {
      this.$store.dispatch('deleteBasket', this.$route.params.uuid)
      this.$router.push('/')
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
    margin-left: 0.8em;
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
