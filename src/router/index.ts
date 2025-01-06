import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import ContactIndex from '@/pages/ContactIndex.vue'
import ContactDetails from '@/components/ContactDetails.vue'

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
    {
      path: '/contact/:id',
      name: 'contact-details',
      component: ContactDetails,
    }
  ],
})

export default router
