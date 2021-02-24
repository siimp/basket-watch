<template>
<div>
    <div class="title is-4">
      <span>Unsubscription </span>
      <span v-show="this.$store.state.basket.notification.subscribed === false">successful</span>
      <span v-show="this.$store.state.basket.notification.subscribed === true">failed</span>
    </div>
</div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('unsubscribeNotifications')
  }
}
</script>

<style scoped>
div.title {
  padding: 1em;
}
</style>
