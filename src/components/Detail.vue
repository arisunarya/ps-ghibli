<template>
  <div class="container page">
    <div class="page-thumbnail"></div>
    <div class="page-content">
      <h1 class="page-title">{{film.title}}</h1>
      <p class="page-paragraph">{{film.description}}</p>
      <div class="page-rating">
        <span class="page-rating-label">Rating</span>
        <span class="page-rating-value">{{film.rt_score}}</span>
      </div>
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
    </div>
  </div>
</template>

<script>
import { FilmService } from '@/service'
export default {
  data () {
    return {
      film: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    FilmService.get(to.params.id).then(({data}) => {
      next(vm => {
        vm.film = data
      })
    })
  }
}
</script>

<style lang="scss">
.page {
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.25);
  min-height: 100vh;
}
.page-thumbnail {
  height: 300px;
  margin: 0 -16px;
  background: #f0f0f0;
}
.page-title {
  margin: 0 0 16px;
  font-size: 32px;
}
.page-paragraph {
  margin: 0;
}
.page-content {
  position: relative;
  padding: 32px;
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
</style>
