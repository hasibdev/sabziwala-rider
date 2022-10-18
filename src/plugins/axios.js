import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { toastController } from '@ionic/vue'

const instance = axios.create({
   baseURL: process.env.VUE_APP_API_URL,
})


instance.interceptors.request.use(async function (config) {
   store.dispatch('validation/clearErrors')

   // Do something before request is sent
   const token = window.utilities.getCookie('access_token')
   config.headers.common['Authorization'] = `Bearer ${token || ''}`


   return config
}, function (error) {
   // Do something with request error
   console.log('Axios Request error: ', error)

   return Promise.reject(error)
})

instance.interceptors.response.use(function (config) {
   return config
}, async function (err) {

   if (err.response.status === 401) {
      // store.dispatch('auth/logout')
      router.prelace('/signin')
   }

   if (err.response.status === 422) {
      store.dispatch("validation/setErrors", err.response.data.errors)
      const toast = await toastController
         .create({
            message: 'Form Submition Error!',
            duration: 2000,
            color: 'danger'
         })
      toast.present()
   }
   return Promise.reject(err)
})

export default instance