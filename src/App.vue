<template>
  <div id="app">
    <div class="container">
      <br/>
      <br/>
      <router-link to="/">Films ({{films.length}})</router-link>
      <br/>
      <br/>
    </div>
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'App',
  beforeRouteEnter (to, from, next) {
    store.dispatch('getFilms').then(() => next())
  },
  computed: {
    films () {
      return store.getters.films
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  background: #fafafa;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #555;
  line-height: 1.5;
  font-size: 16px;
  margin: 0;
}
.container {
  width: 900px;
  margin: 0 auto;
  padding: 0 16px;
}
</style>
