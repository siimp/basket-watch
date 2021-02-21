<template>
<div>
    <div class="title is-4">
      <span>Unsubscription </span>
      <span v-show="unsuscribed === null">in process</span>
      <span v-show="unsuscribed === true">successful</span>
      <span v-show="unsuscribed === false">failed</span>
    </div>
</div>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      unsuscribed: null
    }
  },
  created: function () {
    axios.get(process.env.VUE_APP_API_ENDPOINT + '/basket/' + this.$route.params.uuid + '/notification/unsubscribe')
      .then(response => {
        this.unsuscribed = true
      })
      .catch(() => {
        this.unsuscribed = false
      })
  }
}
</script>

<style scoped>
div.title {
  padding: 1em;
}
</style>
