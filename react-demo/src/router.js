import update from './views/update'

const router = [
  {
    path: '/',
    component: update
    // component: import((/* webpackChunkName: "update" */ "./views/update.js")),
  }
]
export default router