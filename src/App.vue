<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="slide-animation main-router-view"/>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      transitionName: null
    }
  },
  watch: {
    $route (to, from) {
      if (from.meta.flowOrder) {
        this.transitionName = to.meta.flowOrder > from.meta.flowOrder ? 'slide-left' : 'slide-right'
      } else {
        this.transitionName = null
      }
    }
  }
}
</script>

<style scoped>
.main-router-view {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
