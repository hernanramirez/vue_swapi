import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Contacts from './views/Contacts.vue'
import People from './views/People.vue'
import Films from './views/Films.vue'
import FilmDetail from './views/FilmDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/people',
      name: 'people',
      component: People
    },
    {
      path: '/films',
      name: 'films',
      component: Films
    },
    {
      path: '/film_detail',
      name: 'film_detail',
      component: FilmDetail
    }

  ]
})
