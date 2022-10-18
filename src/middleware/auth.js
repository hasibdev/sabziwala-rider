export default async function auth({ next, router }) {
    const localtoken = window.utilities.getCookie('access_token')
    if (!localtoken) return router.replace('/signin')

    return next()
}