import { createRouter, createWebHashHistory } from 'vue-router'
import GalleryPage from '@/views/GalleryPage.vue'

const router = createRouter({
  history: createWebHashHistory('/interactive-exhibit/'),
  routes: [
    {
      path: '/',
      name: 'Gallery',
      component: GalleryPage,
    },
  ],
})

export default router
