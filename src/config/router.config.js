// eslint-disable-next-line
import { PortalLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: PortalLayout,
    meta: { title: '首页' },
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import(/* webpackChunkName: "index" */ '@/views/index/Index')
      },
      {
        path: '/nfts',
        name: 'Nfts',
        component: () => import(/* webpackChunkName: "index" */ '@/views/nfts/Index')
      },
      {
        path: '/linkdrop',
        name: 'Linkdrop',
        component: () => import(/* webpackChunkName: "index" */ '@/views/linkdrop/Index')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/exception',
    name: 'exception',
    component: RouteView,
    hidden: true,
    redirect: '/exception/403',
    meta: { title: 'menu.exception', icon: 'warning', permission: [] },
    children: [
      {
        path: '/exception/403',
        name: 'Exception403',
        component: () => import('@/views/exception/403'),
        meta: { title: 'menu.exception.not-permission', permission: [] }
      },
      {
        path: '/exception/404',
        name: 'Exception404',
        component: () => import('@/views/exception/404'),
        meta: { title: 'menu.exception.not-find', permission: [] }
      },
      {
        path: '/exception/500',
        name: 'Exception500',
        component: () => import('@/views/exception/500'),
        meta: { title: 'menu.exception.server-error', permission: [] }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404')
  }
]
