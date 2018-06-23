import Vue from 'vue'
import Vuex from 'vuex'
import { FilmService } from './service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    films: [],
    people: [],
    locations: [],
    species: [],
    vehicles: []
  },
  mutations: {
    removeFilm (state) {
      while (state.films.length > 0) {
        state.films.pop()
      }
    },
    addFilm (state, payload) {
      state.films.push(payload)
    },
    addPeople (state, payload) {
      state.people.push(payload)
    }
  },
  getters: {
    films (state) {
      return state.films
    }
  },
  actions: {
    getFilms (state) {
      if (this.state.films.length) {
        return state.getters.films
      }

      return FilmService
        .get()
        .then(({data}) => {
          data.map(film => {
            state.commit('addFilm', film)
          })
        })
    }
  }
})
