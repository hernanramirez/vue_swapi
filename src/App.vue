<template>
  <div id="app">
    <app-header></app-header>
    <app-hero></app-hero>
    <div id="nav">
      <router-link to="/">Home</router-link> | {{scrolled}} |
      <router-link to="/contacts">Contacts</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import appHeader from './components/Header.vue'
  import appHero from './components/Hero.vue'

  export default {
    
    components: {
      'app-header': appHeader,
      'app-hero': appHero,
    },

    data () {
      return {
        scrollPosition: 100,
        active: null,
        lastActive: null,
        scrolled: false,
      }
    },
    mounted () {
      //VueScrollTo.scrollTo('#hero',200);
      this.active = 1
      this.lastActive = 1

      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {

      handleScroll() {
        let scroll = window.scrollY
        let el = document.querySelector('#header');

        if (scroll > this.scrollPosition) {
          el.classList.add('header-fixed')
            
        }else {
          el.classList.toggle('header-fixed');
        }
      }
    }
  }
    </script>

    <style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
    #nav {
      padding: 30px;
    }

    #nav a {
      font-weight: bold;
      color: #2c3e50;
    }

    #nav a.router-link-exact-active {
      color: #42b983;
    }
  </style>


