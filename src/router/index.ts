import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainScreenVC from '@/vistas/menuprincipal/MainScreenVC.vue';
import GameScreenVC from '@/vistas/gamescreen/GameScreenVC.vue';
import CreadorEntidadesVC from '@/vistas/creadorentidades/CreadorEntidadesVC.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'MainScreen',
    component: MainScreenVC
  },
  // {
  // 	path: '*',
  // 	redirect: '/'
  // },
  {
    path: '/game-screen',
    name: 'GameScreen',
    component: GameScreenVC
  },
  {
    path: '/creador-entidades',
    name: 'CreadorEntidades',
    component: CreadorEntidadesVC
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
