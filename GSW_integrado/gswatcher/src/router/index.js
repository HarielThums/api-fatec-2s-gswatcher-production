import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Perfil from '../views/Perfil.vue'
import Desenvolvedores from '../views/Desenvolvedores.vue'
import Upload from '../views/Upload.vue'
import Projetos from '../views/Projetos.vue'
import Projeto from '../views/Projeto.vue'
import FirstAccess from '../views/FirstAccess.vue'
import DevDetails from '../views/DevDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/about/:id',
    name: 'about',
    component: About
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: Perfil
  },
  {
    path: '/desenvolvedores',
    name: 'desenvolvedores',
    component: Desenvolvedores
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload
  },
  {
    path: '/projeto/:id?',
    name: 'projeto',
    component: Projeto
  },
  {
    path: '/projetos',
    name: 'projetos',
    component: Projetos
  },
  {
    path: '/firstaccess',
    name: 'firstaccess',
    component: FirstAccess
  },
  {
    path: '/devdetails',
    name: 'devdetails',
    component: DevDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
