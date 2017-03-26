import Vue from 'vue'
import Router from 'vue-router'
import Feed from '@/components/Feed'
import Movie from '@/components/Movie'
import Person from '@/components/Person'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'feed',
      component: Feed
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: Movie
    },
    {
      path: '/person/:name/:type',
      name: 'person',
      component: Person
    }
  ]
})
