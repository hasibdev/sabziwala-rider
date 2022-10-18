import { createRouter, createWebHistory } from '@ionic/vue-router'
import routes from './routes'
import middlewarePipeline from './middlewarePipeline'


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Befor Route
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]

  const context = {
    to,
    from,
    next,
    router
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  })

})

export default router
