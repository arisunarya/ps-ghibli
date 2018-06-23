import Vue from 'vue'
import Vuex from 'vuex'
import { FilmService } from './service'
import { isEqual } from './utilities'

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
    addFilm (state, payload) {
      state.films.push(payload)
    }
  },
  actions: {
    getFilms (state, params) {
      return FilmService
        .get(params)
        .then(({data}) => {
          if (!isEqual(this.state.films, data)) {
            data.map(film => {
              state.commit('addFilm', film)
            })
          }
        })
    }
  },
  getters: {
    films (state) {
      return state.films
    },
    getFilmById: (state) => id => {
      return state.films.find(film => film.id === id)
    }
  }
})
