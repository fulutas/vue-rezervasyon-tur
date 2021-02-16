import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import SeferAra from '../views/SeferAra'
import KoltukSecimi from '../views/KoltukSecimi'
import NotFound404 from '../views/NotFound404'
import YolcuBilgileri from '../views/YolcuBilgileri'
import OdemeBilgileri from '../views/OdemeBilgileri'

import NProgress from "nprogress"

Vue.use(Router)

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'home',
    redirect: '/seferara'
  },
  {
    path: '/seferara',
    name: 'seferara',
    component: SeferAra
  },
  {
    path: '/koltuksecimi/:sefer_id?',
    name: 'koltuksecimi',
    component: KoltukSecimi
  },
  {
    path: '/yolcubilgileri',
    name: 'yolcubilgileri',
    component: YolcuBilgileri
  },
  {
    path: '/odemebilgileri',
    name: 'odemebilgileri',
    component: OdemeBilgileri
  },
  {
    path: "*",
    component : NotFound404
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Sayfa açılmak istendiğinde progress bar gözükür.
router.beforeResolve(( to, from, next) => {
  if (to.name){
      NProgress.start();
  }
  next();
})

// Sayfa yükleme tamamlandıktan sonra progress bar gizlenir.
router.afterEach((to, from) => {
  NProgress.done();
})

export default router
