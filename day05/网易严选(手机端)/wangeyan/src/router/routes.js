import Home from '../views/Home'
export default [
  {
    //首页路由
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../views/Category')
  },
  {
    path: '/worthybuy',
    name: 'GoodTopic',
    component: () => import('../views/Topic')
  }
]