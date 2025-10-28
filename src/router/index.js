import { createRouter, createWebHistory } from 'vue-router'
import GalleryPage from '@/views/GalleryPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Gallery',
      component: GalleryPage,
    },
  ],
})

export default router
