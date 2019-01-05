import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Join from '@/components/Join'
import Vote from '@/components/VoteList'
import Voter from '@/components/VoteLister'
import Detail from '@/components/Detail'
import Success from '@/components/Success'
import Poster from '@/components/Poster'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/Join',
      name: 'Join',
      component: Join
    },
    {
      path: '/Vote',
      name: 'Vote',
      component: Vote
    },
    {
      path: '/Voter',
      name: 'Voter',
      component: Voter
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/Success',
      name: 'Success',
      component: Success
    },
    {
      path: '/Poster',
      name: 'Poster',
      component: Poster
    }
  ]
})
