import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = 'https://ghibliapi.herokuapp.com/'
  },
  get (resource, slug = '') {
    return Vue.axios
      .get(`${resource}/${slug}`)
      .catch((error) => {
        throw new Error(`ApiService ${error}`)
      })
  }
}

export default ApiService

export const FilmService = {
  get (slug) {
    return ApiService.get('films', slug)
  }
}
