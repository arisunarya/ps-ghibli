<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
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
