import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import ContactIndex from '@/pages/ContactIndex.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactIndex,
    },
  ],
})

export default router
