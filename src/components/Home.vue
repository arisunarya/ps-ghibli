<template>
  <div class="container">
    <div>{{films.length}}</div>
    <div class="row-filmCard">
      <div v-for="film in films" :key="film.index" class="col-filmCard">
        <router-link :to="`/film/${film.id}`" class="filmCard">
          <div class="filmCard-thumbnail"></div>
          <div class="filmCard-meta">
            <h4 class="filmCard-title">{{film.title}}</h4>
            <span class="filmCard-producer">{{film.producer}}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  beforeRouteEnter (to, from, next) {
    store.dispatch('getFilms').then(() => {
      next()
    })
  },
  computed: {
    films () {
      return this.$store.getters.films
    }
  }
}
</script>

<style lang="scss">
.row-filmCard {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -16px;
}
.col-filmCard {
  width: (100% / 3);
  padding: 16px;
  display: flex;
}
.filmCard {
  flex: 1;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0,0,0,0.25);
  border-radius: 8px;
  background: #fff;
}
.filmCard-meta {
  padding: 16px;
}
.filmCard-thumbnail {
  background: #f0f0f0;
  height: 200px;
}
.filmCard-title {
  font-weight: normal;
  font-size: 18px;
  line-height: 1.25;
  margin: 0;
}
.filmCard-producer {
  font-size: 14px;
  color: #aaa;
}
</style>
