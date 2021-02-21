<template>
<div>
  <div class="header">
    <router-link to="/">
      <ion-icon name="arrow-back-sharp"></ion-icon>
    </router-link>
  </div>
  <div class="baskets-list has-text-centered">
    <h2 class="title">Stored Baskets</h2>
    <ul>
      <li v-for="basket in baskets()" :key="basket">
        <router-link :to="'/basket/' + basket">{{ basket }}</router-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    baskets: function () {
      let baskets = []
      const basketsFromLocalStorage = localStorage.getItem('baskets')
      if (basketsFromLocalStorage) {
        baskets = JSON.parse(basketsFromLocalStorage)
      }
      return baskets
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
.baskets-list {
  padding-top: 0.5em;
}
</style>
