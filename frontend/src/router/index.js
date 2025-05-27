import { createRouter, createWebHistory } from 'vue-router'
import application_for_classes from '../views/application_for_classes.vue'
import applied_lecture from '../views/applied_lecture.vue'
import cancel from '@/views/cancel.vue'
import home from '@/views/home.vue'
import management from '@/views/management.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home,
    },
    {
      path: '/application_for_classes',
      name: 'Application_for_classes',
      component: application_for_classes,
    },
    {
      path: '/applied_lecture',
      name: 'Applied_lecture',
      component: applied_lecture
    },
    {
      path: '/cancel',
      name: 'cancel',
      component: cancel
    },
    {
      path: '/management',
      name: 'management',
      component: management
    },

  ],
})

export default router
