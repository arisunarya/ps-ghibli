<template>
  <div class="container">
    <div class="page">
      <div class="page-thumbnail"></div>
      <div class="page-content">
        <ul class="page-info">
          <li>
            <span class="page-info-label">Director</span>
            <span class="page-info-value">{{film.director}}</span>
          </li>
          <li>
            <span class="page-info-label">Producers</span>
            <span class="page-info-value">{{film.producer}}</span>
          </li>
          <li>
            <span class="page-info-label">Release Date</span>
            <span class="page-info-value">{{film.release_date}}</span>
          </li>
        </ul>
        <div class="page-rating">
          <span class="page-rating-label">Rating</span>
          <span class="page-rating-value">{{film.rt_score}}</span>
        </div>
        <h1 class="page-title">{{film.title}}</h1>
        <h3>description</h3>
        <p class="page-paragraph">{{film.description}}</p>
        <div v-if="people.length">
          <h3>characters</h3>
          <ul class="page-item-columns">
            <li v-for="(person, index) in people" :key="index">
              <div class="page-item">
                <div class="page-item-thumbnail"></div>
                <h4 class="page-item-name">{{person.name}}</h4>
                <div class="page-item-info">
                  <span>Gender</span>
                  <div>{{person.gender}}</div>
                </div>
                <div class="page-item-info">
                  <span>Age</span>
                  <div>{{person.age}}</div>
                </div>
                <div class="page-item-info">
                  <span>Species</span>
                  <div>{{person.species}}</div>
                </div>
                <div class="page-item-info">
                  <span>Eye Color</span>
                  <div>{{person.eye_color}}</div>
                </div>
                <div class="page-item-info">
                  <span>Hair Color</span>
                  <div>{{person.hair_color}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="species.length">
          <h3>species</h3>
          <ul class="page-item-columns">
            <li v-for="(spec, index) in species" :key="index">
              <div class="page-item">
                <div class="page-item-thumbnail"></div>
                <h4 class="page-item-name">{{spec.name}}</h4>
                <div class="page-item-info">
                  <span>Classified</span>
                  <div>{{spec.classification}}</div>
                </div>
                <div class="page-item-info page-item-info_colors">
                  <span>Eye Colors</span>
                  <div>{{spec.eye_colors}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import store from '@/store'
import ApiService, { FilmService, PeopleService, SpeciesService } from '@/service'
export default {
  data () {
    return {
      film: {},
      people: [],
      species: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      //
    })
  },
  beforeRouteEnter (to, from, next) {
    const findId = (str) => {
      return str.split('/')[str.split('/').length - 1]
    }

    let isValidArray = arr => {
      if (arr[0] !== arr[0].substring(0, arr[0].lastIndexOf('/') + 1)) return true
      return false
    }

    const fetchSpecies = (arr) => {
      return ApiService.all(arr.map(item => SpeciesService.get(findId(item)).then(({data}) => data)))
    }

    const fetchPeople = (arr) => {
      return ApiService.all(arr.map(item => PeopleService.get(findId(item)).then(({data}) => data)))
    }

    FilmService.get(to.params.id)
      .then(({data}) => {
        let page = {
          film: data,
          people: [],
          species: []
        }
        return ApiService.all([
          isValidArray(data.species) && fetchSpecies(data.species)
            .then(species => {
              return { species }
            }),
          isValidArray(data.people) && fetchPeople(data.people)
            .then(people => {
              return { people }
            })
        ]).then(response => {
          response.map(service => {
            let key = Object.keys(service)[0]

            if (key === 'species') {
              service.species.map(species => {
                page.species.push(species)
              })
            }

            if (key === 'people') {
              service.people.map(people => {
                const findSpecies = response[0].species.find(species => {
                  return species.id === findId(people.species)
                })
                people.species = findSpecies.name
                page.people.push(people)
              })
            }
          })

          return page
        })
      })
      .then(data => {
        next(vm => {
          vm.film = data.film
          vm.people = data.people
          vm.species = data.species
          console.log('fetching data id:', vm.film.id, 'complete!')
        })
      })

    // const getStoredData = store.getters.films.find(film => {
    //   return film.id === to.params.id
    // })

    // if (getStoredData) {
    //   next(vm => {
    //     vm.film = getStoredData
    //     console.log('get store data id:', vm.film.id, 'complete!')
    //   })
    // } else {

    // }
  }
}
</script>

<style lang="scss">
.page {
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.25);
  min-height: 100vh;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}
.page-thumbnail {
  height: 300px;
  background: #333;
}
.page-title {
  margin: 0 0 16px;
  font-size: 32px;
}
.page-paragraph {
  margin: 0 0 32px;
}
.page-content {
  position: relative;
  padding: 0 32px 32px;
}
.page-rating {
  position: absolute;
  top: -50px;
  right: 50px;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0,0,0,0.25);
  line-height: 1;
  color: #fff;
  background: #ffc200;
  text-shadow: 0 1px 2px rgba(0,0,0,0.25);
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50%;
    background: rgba(255, 158, 0, 0.3);
    transform: rotate(45deg);
    transform-origin: top center;
  }

  span {
    position: relative;
  }
  &-label {
    margin: 8px 0;
  }
  &-value {
    font-size: 32px;
    font-weight: bold;
  }
}
.page-info {
  display: flex;
  list-style: none;
  padding-left: 0;
  padding-right: 80px;
  margin: 0 -32px 32px;
  background: #a924f5;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  color: #fff;

  > li {
    flex: 1;
    padding: 16px 32px;

    + li {
      border-left: 1px solid rgba(0,0,0,0.075);
    }

    > span {
      display: block;

      + span {
        margin-top: 8px;
      }
    }
  }
}
.page-info-label {
  font-size: 14px;
  color: rgba(255,255,255,0.75);
  line-height: 1;
}
.page-info-value {
  line-height: 1;
}
.page-item-columns {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0 -33px 0 -32px;
  border-top: 1px solid #eee;
  box-shadow: inset 0 -1px 0 0 #eee;

  > li {
    display: flex;
    width: (100%) / 4;
    box-shadow: -1px -1px 0 0 #eee;
  }
}
.page-item {
  flex: 1;
  background: #fff;
  padding: 32px 32px 16px;
  box-shadow: inset -1px -1px 0 0 #eee;
}
.page-item-thumbnail {
  height: 154px;
  margin: 0 0 16px;
  border-radius: 8px;
  background: #f5f5f5;
}
.page-item-name {
  margin: 0 0 16px;
  font-size: 14px;
  text-align: center;
}
.page-item-info {
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  justify-content: space-between;
  border-top: 1px solid #f5f5f5;
  line-height: 1.25;
  padding: 4px 0;

  div,
  span {
    padding: 4px 0;
  }
  span {
    color: #999;
  }
}
</style>
