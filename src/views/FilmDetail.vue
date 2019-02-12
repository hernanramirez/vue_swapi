<template>
  <div class="film_detail">
    <AppFilms msg="Welcome to Star Wars People"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AppFilms from '@/components/AppFilmDetail.vue'

export default {
  name: 'film_detail',
  components: {
    AppFilms
  }
}
</script>