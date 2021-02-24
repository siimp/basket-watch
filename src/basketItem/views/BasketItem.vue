<template>
<div>
  <div class="header">
    <router-link :to="'/basket/' + this.$route.params.uuid">
      <ion-icon class="is-clickable" name="arrow-back-sharp"></ion-icon>
    </router-link>
  </div>
  <div class="has-text-centered">
    <h2 class="title">Add item</h2>
  </div>
  <div class="section">
    <div>
      <div class="field">
          <label class="label">Url</label>
          <div class="control">
              <input class="input" type="url" placeholder="https://store.com/item/123" v-model="url">
          </div>
      </div>
          <div class="field">
          <label class="label">Quantity</label>
          <div class="control">
              <input class="input" type="number" placeholder="1" v-model="quantity">
          </div>
      </div>
      <hr/>
      <br/>
    </div>
  </div>
  <div class="bottom max-width">
    <div class="columns is-mobile is-12">
      <div class="column">
        <button class="button is-info max-width" :disabled="!isValid()" @click="add">Add</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import * as bulmaToast from 'bulma-toast'

export default {
  data () {
    return {
      url: '',
      quantity: 1
    }
  },
  methods: {
    isValid: function () {
      return this.url && this.quantity > 0
    },
    add: function () {
      if (this.isValid()) {
        axios.post(process.env.VUE_APP_API_ENDPOINT + '/basket/' + this.$route.params.uuid + '/basket-item', { url: this.url, quantity: this.quantity })
          .then(response => {
            bulmaToast.toast({ message: 'Item added to basket' })
            this.url = ''
            this.quantity = 1
          })
          .catch((error) => {
            bulmaToast.toast({
              message: `Adding item failed - ${error.response ? error.response.statusText : error}`,
              type: 'is-danger'
            })
          })
      }
    }
  }
}
</script>

<style scoped>
.header {
  text-align: left;
  font-size: 1.5em;
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
.header ion-icon {
  padding: 0.5em;
}
div.section {
  top: 50%;
  position: absolute;
  transform: translate(0, -50%);
  width: 100%
}
.max-width {
    width: 100%;
}
.max-height {
    height: 100%;
}
.bottom {
  position: fixed;
  bottom: 0px;
}
</style>
