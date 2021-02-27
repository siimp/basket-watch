<template>
<div>
  <div class="header">
    <router-link to="/">
      <ion-icon class="is-clickable" name="arrow-back-sharp"></ion-icon>
    </router-link>
  </div>
  <div class="baskets-list has-text-centered">
    <h2 class="title">Baskets</h2>
    <div class="menu">
      <ul class="menu-list">
          <li v-for="basket in this.$store.state.bookmarks" :key="basket">
            <router-link :to="'/basket/' + basket">{{ basket }}</router-link>
          </li>
      </ul>
    </div>
  </div>
</div>
</template>

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
</style>
