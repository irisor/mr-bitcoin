import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import ContactIndex from '@/pages/ContactIndex.vue'
import ContactDetails from '@/pages/ContactDetails.vue'
import Stats from '@/pages/Stats.vue'
import ContactEdit from '@/pages/ContactEdit.vue'

const router = createRouter({
  history: createWebHashHistory('/mr-bitcoin/'),
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
    },
    {
      path: '/contact/edit/:id?',
      name: 'contact-edit',
      component: ContactEdit
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats,
    }
  ],
})

export default router
