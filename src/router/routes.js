import auth from '@/middleware/auth'
import guest from '@/middleware/guest'
import Default from '@/layouts/Default'

const loadView = (view) => () => import(`@/views/${view}.vue`)

export default [
    {
        path: '/',
        component: Default,
        children: [
            {
                path: '/',
                redirect: '/home',
            },
            {
                path: '/home',
                component: loadView('home/index'),
                name: 'home',
                meta: {
                    middleware: [auth]
                }
            },
            {
                path: '/orders',
                component: loadView('orders/index'),
                name: 'orders',
                meta: {
                    middleware: [auth]
                }
            },
            {
                path: '/orders/:id',
                component: loadView('orders/details'),
                name: 'order-details',
                meta: {
                    middleware: [auth]
                }
            },
            {
                path: '/deleverd',
                component: loadView('deleverd/index'),
                name: 'deleverd',
                meta: {
                    middleware: [auth]
                }
            },
            {
                path: '/deleverd/:id',
                component: loadView('deleverd/details'),
                name: 'deleverd-details',
                meta: {
                    middleware: [auth]
                }
            },
            {
                path: '/profile',
                component: loadView('profile/index'),
                name: 'profile',
                meta: {
                    middleware: [auth]
                }
            },
            {
                path: '/change-password',
                component: loadView('auth/ChangePassword'),
                meta: {
                    middleware: [auth]
                }
            },
            {
                path: '/forgot-password',
                component: loadView('auth/ForgotPassword'),
                meta: {
                    middleware: [guest]
                }
            },
        ]
    },
    {
        path: '/signin',
        component: loadView('auth/signin'),
        name: 'signin',
        meta: {
            middleware: [guest]
        }
    },
    {
        path: '/signup',
        component: loadView('auth/signup'),
        name: 'signup',
        meta: {
            middleware: [guest]
        }
    },

]