<template>
  <div class="home">
    <br />
    <HelloWorld msg="Elementos de programación"/>
    <ul>
        <li>Vue 3.0</li>
        <li>Bootstrap-vue</li>
        
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
