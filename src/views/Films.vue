<template>
  <div class="films">
    <AppFilms msg="Welcome to Star Wars People"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AppFilms from '@/components/AppFilms.vue'

export default {
  name: 'films',
  components: {
    AppFilms
  }
}
</script>