<template>
  <div>
    <div class="header">
      <router-link v-show="hasStoredBaskets()" to="/baskets">
        <ion-icon name="bookmarks-sharp"></ion-icon>
      </router-link>
    </div>
    <div>
      <section class="section">
        <div class="container has-text-centered">
          <h1 class="title">Basket Watch</h1>
          <h2 class="subtitle">
            A simple application that let's you to watch for <strong>price changes</strong> of the items you are wanting to buy.
          </h2>
        </div>
      </section>
    </div>

    <div class="has-text-centered">
        <button class="button is-success" @click="create">Create a new basket</button>
    </div>
    <div class="platforms has-text-centered">
      <div>
        <section class="section">
          <p><strong>Supported platforms</strong></p>
          <div class="container">
            <div class="columns">
              <div class="column">
                <img class="logo" alt="Arvutitark logo" src="../assets/logo-at.png" />
                <img class="logo" alt="1A logo" src="../assets/logo-1A.png" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    create: function () {
      axios.post(process.env.VUE_APP_API_ENDPOINT + '/basket')
        .then(response => {
          this.$router.push('/basket/' + response.data.uuid)
        })
    },
    hasStoredBaskets: function () {
      return !!localStorage.getItem('baskets') && !!JSON.parse(localStorage.getItem('baskets')) && JSON.parse(localStorage.getItem('baskets')).length > 0
    }
  }
}
</script>

<style scoped>
.column img.logo {
  max-height: 1.3em;
  margin-right: 0.5em;
  margin-left: 0.5em;
  box-shadow: 2px 2px 2px lightgray;
}
.header {
  text-align: right;
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
</style>
