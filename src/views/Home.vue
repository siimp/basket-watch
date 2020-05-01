<template>
  <div>
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
                <img class="logo" alt="Arvutitark logo" src="../assets/at-logo.png">
                <!--<img class="logo" alt="1a logo" src="../assets/1a-logo.png">-->
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
    }
  }
}
</script>

<style scoped>
section.section {
  padding-top: 8em;
}
.platforms {
  padding-top: 1em;
}
.column img.logo {
  max-height:20px;
  margin-right: 1em;
  box-shadow: 5px 5px 2px gray;
}
</style>
