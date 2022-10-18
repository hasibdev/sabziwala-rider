import axios from '@/plugins/axios'

export default {
   namespaced: true,
   state: function () {
      return {
         status: false,
         user: null,
      }
   },
   getters: {
      getUser(state) {
         return state.user
      }
   },
   mutations: {
      SET_AUTH(state, data) {
         state.status = data.status
         state.user = data.user
      }
   },
   actions: {
      async checkAuth({ commit }) {
         try {
            const token = window.utilities.getCookie('access_token')
            if (!token) return Promise.reject(false)

            const res = await axios.get('/rider/profile')
            commit('SET_AUTH', { status: true, user: res.data.data })
            return Promise.resolve(res)
         } catch (error) {
            return Promise.reject(error)
         }
      },

      async login({ commit }, { data, url }) {
         try {
            const res = await axios.post(url, data)
            window.utilities.setCookie('access_token', res.data.access_token)

            const profile = await axios.get('/rider/profile')
            commit('SET_AUTH', { status: true, user: profile.data.data })

            return Promise.resolve(res)
         } catch (error) {
            console.error(error)
            return Promise.reject(error)
         }
      },

      async logout({ commit }) {
         try {
            const res = await axios.post('/rider/logout')
            window.utilities.removeCookie('access_token')
            commit('SET_AUTH', { status: false, user: null })

            return Promise.resolve(res)
         } catch (error) {
            console.error(error)
            return Promise.reject(error)
         }
      }
   }
}