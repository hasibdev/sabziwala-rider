import store from '@/store'
import router from '../router'

export default async (app) => {
    try {
        await store.dispatch('auth/checkAuth')
    } catch (error) {
        window.utilities.removeCookie('access_token')
        router.replace('/signin')
    }

    // Set Global auth properties
    app.config.globalProperties.auth = {
        status: store.state.auth.status,
        user: store.state.auth.user,
        login: payload => store.dispatch('auth/login', payload),
        logout: () => store.dispatch('auth/logout')
    }
}