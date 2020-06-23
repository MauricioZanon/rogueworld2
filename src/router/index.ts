import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainScreen from '@/vistas/menuprincipal/MainScreen.vue';
import GameScreen from '@/vistas/gamescreen/GameScreen.vue';
import CreadorEntidades from '@/vistas/creadorentidades/CreadorEntidades.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'MainScreen',
    component: MainScreen
  },
  // {
  // 	path: '*',
  // 	redirect: '/'
  // },
  {
    path: '/game-screen',
    name: 'GameScreen',
    component: GameScreen
  },
  {
    path: '/creador-entidades',
    name: 'CreadorEntidades',
    component: CreadorEntidades
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
