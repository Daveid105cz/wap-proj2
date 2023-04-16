import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import StoresView from '../views/StoresView.vue'
import WishlistView from '../views/WishlistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game/:id',
      name: 'game detail',
      component: () => import('../views/GameView.vue')
    },
    {
        path: '/search',
        name: 'search',
        component: SearchView
    },
    {
        path: '/stores',
        name: 'stores',
        component: StoresView
    },
    {
        path: '/wishlist',
        name: 'wishlist',
        component: WishlistView
    }
  ]
})

export default router
