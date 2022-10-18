<template>
   <ion-page>
      <ion-content class="ion-padding">
         <ion-row class="ion-align-items-center">
            <ion-col>
               <h1>Reset Password</h1>
            </ion-col>
            <ion-col class="ion-text-end">
               <router-link to="/signin" class="signup-btn">Signin</router-link>
            </ion-col>
         </ion-row>

         <div style="height:20px;"></div>

         <form @submit.prevent="requestResetPassword">
            <!-- Email -->
            <ion-label class="" position="stacked">Email address</ion-label>
            <ion-input v-model="email" class="ion-margin-bottom" type="email" placeholder="Your Email Address" required></ion-input>

            <ion-button :disabled="savingState" type="submit" expand="block" class="text-white">
               <ion-spinner v-if="savingState"></ion-spinner>
               <ion-text v-else>Send Reset Link</ion-text>
            </ion-button>
         </form>
      </ion-content>
   </ion-page>
</template>

<script>
import {
   IonInput, IonLabel, IonPage, IonContent, IonSpinner, IonText, IonButton,
   toastController
} from '@ionic/vue'
export default {
   name: "RiderForgotPassword",
   components: {
      IonInput, IonLabel, IonPage, IonContent, IonSpinner, IonText, IonButton
   },
   data() {
      return {
         email: null,
         savingState: false
      }
   },
   methods: {
      async requestResetPassword() {
         this.savingState = true
         try {
            await this.axios.post("/rider/forgot-password", { email: this.email })
            this.email = null

            const toast = await toastController
               .create({
                  message: 'Reset Email send Successfully',
                  duration: 2000,
                  color: 'secondary'
               })
            toast.present()
         } catch (error) {
            console.log(error)
         } finally {
            this.savingState = false
         }
      }
   }
}
</script>