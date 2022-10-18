<template>
   <app-layout title="Change Password">
      <h2 class="ion-text-center text-primary">Change Password</h2>
      <div style="height:20px;"></div>
      <form @submit.prevent="changePassword">
         <!-- Old Password -->
         <ion-label position="stacked">Old Password</ion-label>
         <div class="input-control">
            <ion-input v-model="form.oldPassword" :type="`${oldpasswordVisible ? 'text': 'password'}`" placeholder="Old Password"></ion-input>
            <div class="input-icon-right">
               <font-awesome-icon @click="oldpasswordVisible=false" v-if="oldpasswordVisible" :icon="faEyeSlash" />
               <font-awesome-icon @click="oldpasswordVisible=true" v-else :icon="faEye" />
            </div>
         </div>
         <p v-if="validationErrors.oldPassword" class="mt-5 mb-0 text-danger">{{ validationErrors.oldPassword[0] }}</p>

         <div class="ion-margin-vertical"></div>

         <!-- New Password -->
         <ion-label position="stacked">New Password</ion-label>
         <div class="input-control">
            <ion-input v-model="form.password" :type="`${newpasswordVisible ? 'text': 'password'}`" placeholder="Old Password"></ion-input>
            <div class="input-icon-right">
               <font-awesome-icon @click="newpasswordVisible=false" v-if="newpasswordVisible" :icon="faEyeSlash" />
               <font-awesome-icon @click="newpasswordVisible=true" v-else :icon="faEye" />
            </div>
         </div>
         <p v-if="validationErrors.password" class="mt-5 mb-0 text-danger">{{ validationErrors.password[0] }}</p>

         <div class="ion-margin-vertical"></div>
         <!-- Confirm password -->
         <ion-label position="stacked">Confirm New Password</ion-label>
         <ion-input v-model="form.password_confirmation" type="password" placeholder="Confirm New Password"></ion-input>

         <div style="height:25px;"></div>

         <!-- Submit button -->
         <ion-button :disabled="savingState" type="submit" expand="block" class="text-white">
            <ion-spinner v-if="savingState"></ion-spinner>
            <ion-text v-else>Save</ion-text>
         </ion-button>
      </form>
   </app-layout>
</template>

<script>
import { IonLabel, IonInput, toastController, IonSpinner, IonText, IonButton } from '@ionic/vue'
import AppLayout from "@/layouts/AppLayout.vue"
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import validation from '@/mixins/validation'

export default {
   components: {
      FontAwesomeIcon, AppLayout, IonLabel, IonInput, IonSpinner, IonText, IonButton
   },
   mixins: [validation],
   data() {
      return {
         faEye, faEyeSlash,
         oldpasswordVisible: false,
         newpasswordVisible: false,
         savingState: false,
         form: {
            oldPassword: null,
            password: null,
            password_confirmation: null
         },
      }
   },

   methods: {
      async changePassword() {
         try {
            await this.axios.post('/rider/change-password', this.form)
            this.$router.push('/profile')
            const toast = await toastController
               .create({
                  message: 'Password updated Successfully',
                  duration: 2000,
                  color: 'secondary'
               })
            toast.present()
         } catch (error) {
            console.log(error)
         }
      }
   }

}
</script>

<style lang="scss" scoped>
</style>