<template>
  <div class="crudcontacts">
    <img alt="Vue logo" src="../assets/logo.png">
    <CrudContacts msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CrudContacts from '@/components/CrudContacts.vue'

export default {
  name: 'crudcontacts',
  components: {
    CrudContacts
  }
}
</script>
