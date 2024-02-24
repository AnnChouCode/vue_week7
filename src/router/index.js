import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: () => import('../views/user/UserFrontView.vue'),
    meta: { navbarType: 'frontend' },
    children: [
      {
        path: 'home',
        name: 'userhome',
        component: () => import('../views/user/HomeView.vue'),
        meta: {
          title: 'Dessert Time'
        }
      },
      {
        path: 'productlist',
        name: 'productlist',
        component: () => import('../views/user/UserProductList.vue'),
        meta: {
          title: '產品列表 - Dessert Time'
        }
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/user/UserCart.vue'),
        meta: {
          title: '購物車 - Dessert Time'
        }
      },
      {
        path: 'userlogin',
        name: 'userlogin',
        component: () => import('../views/user/UserLogin.vue'),
        meta: {
          title: '登入 - Dessert Time'
        }
      },
      {
        path: 'productinfo/:id',
        component: () => import('../views/user/UserProductInfo.vue'),
        props: (route) => {
          return {
            id: route.params.id
          }
        },
        meta: {
          title: '產品資訊 - Dessert Time'
        }
      },
      {
        path: 'orders',
        component: () => import('../views/user/UserOrders.vue'),
        props: (route) => {
          return {
            id: route.params.id
          }
        },
        meta: {
          title: '訂單 - Dessert Time'
        }
      }
    ]
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    component: () => import('../views/admin/AdminLayout.vue'),
    meta: { navbarType: 'backend' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/admin/AdminDashBoard.vue'),
        meta: {
          title: '使用者後台 - Dessert Time'
        }
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/admin/AdminProductList.vue'),
        meta: {
          title: '產品管理 - Dessert Time'
        }
      },
      {
        path: 'productinfo/new',
        component: () => import('../views/admin/AdminProductInfo.vue'),
        meta: {
          title: '使用者後台 - Dessert Time'
        }
      },
      {
        path: 'productinfo/:id',
        component: () => import('../views/admin/AdminProductInfo.vue'),
        props: (route) => {
          return {
            id: route.params.id
          }
        },
        meta: {
          title: '使用者後台 - Dessert Time'
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/admin/AdminOrders.vue'),
        meta: {
          title: '訂單管理 - Dessert Time'
        }
      },
      {
        path: 'orderinfo/:id',
        component: () => import('../views/admin/AdminOrderInfo.vue'),
        props: (route) => {
          return {
            id: route.params.id
          }
        },
        meta: {
          title: '訂單管理 - Dessert Time'
        }
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/admin/AdminCoupons.vue'),
        meta: {
          title: '優惠券管理 - Dessert Time'
        }
      },
      {
        path: 'articles',
        name: 'articles',
        component: () => import('../views/admin/AdminArticles.vue'),
        meta: {
          title: '文章管理 - Dessert Time'
        }
      },
      {
        path: 'articleinfo/new',
        component: () => import('../views/admin/AdminArticleInfo.vue'),
        meta: {
          title: '文章管理 - Dessert Time'
        }
      },
      {
        path: 'articleinfo/:id',
        component: () => import('../views/admin/AdminArticleInfo.vue'),
        props: (route) => {
          return {
            id: route.params.id
          }
        },
        meta: {
          title: '文章管理 - Dessert Time'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404 Not Found - Dessert Time'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  // 對於所有路由導航，簡單地讓頁面滾動到頂部
  scrollBehavior (to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

// router 進入前執行
router.beforeEach((to, from, next) => {
  // linkActive 換樣式
  const linkActive = (() => {
    if (to.meta.navbarType === 'backend') {
      return 'theme-dark-navlink-active'
    } else if (to.meta.navbarType === 'frontend') {
      return 'fw-bold text-white'
    } else {
      return 'active'
    }
  })()

  router.options.linkActiveClass = linkActive

  // 頁面變更名稱
  window.document.title = to.meta.title
  next()
})

export default router
