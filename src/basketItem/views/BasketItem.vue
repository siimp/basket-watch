<template>
<div>
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
      <div class="column is-5">
        <button class="button is-success max-width" @click="back">Back</button>
      </div>
      <div class="column is-5 is-offset-2">
        <button class="button is-info max-width" :disabled="!isValid()" @click="add">Add</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      url: '',
      quantity: 1
    }
  },
  methods: {
    back: function () {
      this.$router.push('/basket/' + this.$route.params.uuid)
    },
    isValid: function () {
      return this.url && this.quantity > 0
    },
    add: function () {
      if (this.isValid()) {
        axios.post(process.env.VUE_APP_API_ENDPOINT + '/basket/' + this.$route.params.uuid + '/basket-item', { url: this.url, quantity: this.quantity })
          .then(response => {
            this.url = ''
            this.quantity = 1
          })
      }
    }
  }
}
</script>

<style scoped>
div.section {
  top: 50%;
  position: relative;
  transform: translate(0, -50%);
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
