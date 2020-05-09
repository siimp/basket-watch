<template>
  <div>
    <div class="basket-heading">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <div class="container">
              <p class="title is-4 is-spaced">Basket</p>
              <p class="subtitle small">
                <abbr :title="$route.params.uuid">{{ $route.params.uuid }}</abbr>
              </p>
              <p class="subtitle small">
                <span>Basket will be deleted at {{ this.willBeDeletedAt }}</span>
                &nbsp;
                <ion-icon name="refresh-outline" size="small" @click="refreshWillBeDeletedAt()"></ion-icon>
              </p>
            </div>
          </div>
        </div>
        <div class="level-right">
          <span class="icon">
            <ion-icon name="copy-outline" size="large" @click="copyUrlToClipboard"></ion-icon>
          </span>
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
                <div class="column is-7"><span class="nowrap">Total: <span class="value" v-bind:class="{ 'has-text-success': isTotalLowerThanMin(total, min), 'has-text-danger': isTotalHigherThanMin(total, min) }">{{ total }} €</span></span></div>
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
                <div class="column is-5">{{ basketItem.item.name.substring(0, 50) }}</div>
                <div class="column is-2"><span class="nowrap">Price: <span v-bind:class="{ 'has-text-success': isTotalLowerThanMin(basketItem.item.priceHistory.price, basketItem.item.priceHistory.priceMin), 'has-text-danger': isTotalHigherThanMin(basketItem.item.priceHistory.price, basketItem.item.priceHistory.priceMin) }">{{ basketItem.item.priceHistory.price }}</span> €</span></div>
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
      willBeDeletedAt: this.$route.meta.response.willBeDeletedAt
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
    isTotalLowerThanMin: function (total, min) {
      if (total === min) {
        return false
      }
      return total - min < 0
    },
    isTotalHigherThanMin: function (total, min) {
      if (total === min) {
        return false
      }
      return total - min > 0
    },
    refreshWillBeDeletedAt: function () {
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/basket/' + this.$route.params.uuid + '/refresh')
        .then(response => {
          refreshData(this)
        })
    }
  }
}
</script>

<style scoped>
.basket-heading {
  padding: 1em;
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
.subtitle.small {
  padding-top: 0.5em;
  font-size: 0.8em;
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
