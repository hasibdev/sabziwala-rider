<template>
   <ion-page>
      <ion-content class="ion-padding">
         <ion-row class="ion-align-items-center">
            <ion-col>
               <h1>Sign in</h1>
            </ion-col>
            <!-- <ion-col class="ion-text-end">
               <router-link to="/signup" class="signup-btn">Signup</router-link>
            </ion-col> -->
         </ion-row>
         <p class="ion-margin-bottom ion-padding-bottom">First login your account</p>

         <ion-text v-if="errorMessage" color="danger">
            <p>{{errorMessage}}</p>
         </ion-text>
         <form @submit.prevent="signin" class="">
            <!-- Phone -->
            <ion-label class="" position="stacked">Phone</ion-label>
            <ion-input v-model="form.phone" type="tel" :class="{'border-danger': errorMessage || (validationErrors.phone && validationErrors.phone[0])}" placeholder="Your Phone Number"></ion-input>
            <p v-if="validationErrors.phone" class="mt-5 mb-0 text-danger">{{ validationErrors.phone[0] }}</p>

            <div class="ion-margin-vertical"></div>

            <!-- Password -->
            <ion-label position="stacked">Password</ion-label>
            <div class="input-control">
               <ion-input v-model="form.password" :type="`${passwordVisible ? 'text': 'password'}`" :class="{'border-danger': errorMessage || (validationErrors.password &&validationErrors.password[0])}" placeholder="Password"></ion-input>
               <div class="input-icon-right">
                  <font-awesome-icon @click="passwordVisible =false" v-if="passwordVisible" :icon="faEyeSlash" />
                  <font-awesome-icon @click="passwordVisible =true" v-else :icon="faEye" />
               </div>
            </div>
            <p v-if="validationErrors.password" class="mt-5 text-danger">{{ validationErrors.password[0] }}</p>

            <div class="flex ion-justify-content-end">
               <router-link to="forgot-password" class="ion-text-end ion-padding-top">Forgot Password?</router-link>
            </div>

            <div style="height: 20px;"></div>

            <ion-button :disabled="savingState" type="submit" expand="block" class="text-white">
               <ion-spinner v-if="savingState"></ion-spinner>
               <ion-text v-else>Sign In</ion-text>
            </ion-button>

            <div style="height: 15px;"></div>

            <p class="ion-text-center">Not a rider yet? <router-link to="/signup">Register Here</router-link>
            </p>

         </form>
      </ion-content>
   </ion-page>
</template>

<script>
import {
   IonInput, IonLabel, IonPage, IonContent,
   IonButton, IonRow, IonCol, toastController,
   IonText, IonSpinner
} from '@ionic/vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import validation from '@/mixins/validation'
export default {
   components: {
      IonInput, IonLabel, IonPage, IonContent,
      IonButton, IonRow, IonCol, FontAwesomeIcon,
      IonText, IonSpinner
   },
   mixins: [validation],
   data() {
      return {
         faFacebookF, faTwitter, faEye, faEyeSlash,
         passwordVisible: false,

         form: {
            phone: '',
            password: ''
         },
         errorMessage: '',
         errors: null,
         savingState: false
      }
   },
   methods: {
      async signin() {
         this.savingState = true
         this.errorMessage = ''
         try {
            await this.auth.login({
               url: '/rider/login',
               data: this.form
            })

            this.$router.replace('/')
            const toast = await toastController
               .create({
                  message: 'Sign in Successfully',
                  duration: 2000,
                  color: 'secondary'
               })
            toast.present()

         } catch (error) {
            console.log()
            // if (error.response.status == 401) this.errorMessage = error.response.data.error
            this.errorMessage = 'Email or Password is wrong.'
            const toast = await toastController
               .create({
                  message: 'Sign in Fail',
                  duration: 2000,
                  color: 'danger'
               })
            toast.present()
         } finally {
            this.savingState = false
         }
      },
   },
}
</script>

<style>
ion-button.signup-btn {
   --background: var(--ion-color-primary-contrast);
   --color: var(--ion-color-primary);
}
ion-button.facebook {
   --background: #3b5998;
}
ion-button.twitter {
   --background: #03a9f4;
}
ion-button.google {
   --background: #f4f6f9;
}
</style>