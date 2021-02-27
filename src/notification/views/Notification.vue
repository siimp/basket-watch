<template>
<div>
  <div class="header">
    <router-link :to="'/basket/' + this.$route.params.uuid">
      <ion-icon class="is-clickable" name="arrow-back-sharp"></ion-icon>
    </router-link>
  </div>
  <div class="has-text-centered">
    <h2 class="title">Notification</h2>
  </div>
  <div class="section">
    <div>
      <p v-if="this.$store.state.basket.notification.subscribed">Current subscription is to <strong>{{this.$store.state.basket.notification.email}}</strong></p>
      <br>
    </div>
    <div>
      <div class="field">
        <label class="label">E-mail</label>
        <div class="control">
            <input class="input" type="email" placeholder="email@gmail.com" v-model="emailInput">
        </div>
      </div>
      <hr/>
      <br/>
    </div>
  </div>
  <div class="bottom max-width">
    <div class="columns is-mobile is-12">
      <div class="column">
        <button v-if="this.$store.state.basket.notification.subscribed" class="button is-danger max-width" @click="unsubscribe">Unsubscribe</button>
        <button class="button is-info max-width" :disabled="!isValid" @click="subscribe">Subscribe</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      emailInput: ''
    }
  },
  computed: {
    isValid () {
      return !!this.emailInput
    }
  },
  methods: {
    subscribe () {
      this.$store.dispatch('subscribeNotifications', this.emailInput)
    },
    unsubscribe () {
      this.$store.dispatch('unsubscribeNotifications')
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
  width: 100%;
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
