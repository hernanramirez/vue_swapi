<template>
  <div class="people">
    <AppPeople msg="Welcome to Star Wars People"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AppPeople from '@/components/AppPeople.vue'

export default {
  name: 'people',
  components: {
    AppPeople
  }
}
</script>
