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
  },
  all (resources) {
    return Vue.axios.all(resources)
  }
}

export default ApiService

export const FilmService = {
  get (slug) {
    return ApiService.get('films', slug)
  }
}

export const PeopleService = {
  get (slug) {
    return ApiService.get('people', slug)
  }
}

export const LocationsService = {
  get (slug) {
    return ApiService.get('locations', slug)
  }
}

export const SpeciesService = {
  get (slug) {
    return ApiService.get('species', slug)
  }
}

export const VehiclesService = {
  get (slug) {
    return ApiService.get('vehicles', slug)
  }
}
