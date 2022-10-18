<template>
   <div v-if="localUser">
      <!-- Verification Notic -->
      <div>
         <p v-if="localUser.verified == 0 && localUser.verificationFrontUrl.length == 0" class="bg-grey verification-notic">
            You are not verified yet. Please
            <span class="text-primary " @click="$emit('changeTab', 'verification')"> submit the documents </span> to start working.
         </p>
         <p v-if="localUser.verified == 0 && localUser.verificationFrontUrl.length" class="bg-grey verification-notic">
            Your verification is in progress.
         </p>
      </div>

      <!-- Profile Info -->
      <div class="flex ion-align-items-center ion-margin-bottom">
         <h3 class="ion-margin-end ion-margin-vertical">Profile Details</h3>
         <ion-badge v-if="localUser.verified == 1" color="success">VERIFIED</ion-badge>
         <ion-badge v-else color="danger">UNVERIFIED</ion-badge>
      </div>
      <div class="flex flex-col ion-align-items-center ion-justify-content-center">
         <image-attach-field height="160px" v-model="photo" :url="localUser.profilePhotoUrl"></image-attach-field>
         <ion-button @click="submitImage" v-if="photo" :disabled="photoSavingState" type="button" expand="block" class="text-white">
            <ion-spinner v-if="photoSavingState"></ion-spinner>
            <ion-text v-else>Update Photo</ion-text>
         </ion-button>
      </div>
      <div class="ion-text-center ion-margin-top">
         <h3>{{ localUser.name }}</h3>
         <p class="text-medium">{{ localUser.phone }}</p>
         <p class="text-secondary text-small">Last login: {{ localUser.lastLoginForHuman }}</p>
         <router-link to="/change-password">Change Password</router-link>
      </div>

      <!-- Form -->
      <div style="height: 40px;"></div>
      <form @submit.prevent="updateDetails">
         <!-- First Name -->
         <input-field v-model="localUser.firstName" :error="validationErrors.firstName" placeholder="Your First Name"></input-field>
         <!-- Last Name -->
         <input-field v-model="localUser.lastName" :error="validationErrors.lastName" placeholder="Your Last Name"></input-field>
         <!-- Email -->
         <input-field v-model="localUser.email" :error="validationErrors.email" placeholder="Your Email"></input-field>
         <!-- Phone -->
         <input-field v-model="localUser.phone" :error="validationErrors.phone" placeholder="Phone"></input-field>

         <!-- <ion-button type="submit">Update</ion-button> -->
         <ion-button :disabled="savingState" type="submit" expand="block" class="text-white">
            <ion-spinner v-if="savingState"></ion-spinner>
            <ion-text v-else>Update</ion-text>
         </ion-button>
      </form>
   </div>
   <ion-row v-else class="ion-justify-content-center ion-margin-vertical">
      <ion-spinner name="bubbles"></ion-spinner>
   </ion-row>
</template>

<script>
import { IonRow, IonSpinner, IonBadge, IonButton, toastController, IonText, } from '@ionic/vue'
import ImageAttachField from '@/components/form/ImageAttachField.vue'
import InputField from '@/components/form/InputField'
import validation from '@/mixins/validation'

export default {
   name: 'profile',
   components: {
      IonRow, IonSpinner, IonBadge, IonButton, IonText,
      ImageAttachField, InputField
   },

   props: ['user'],
   mixins: [validation],
   data() {
      return {
         photo: null,
         localUser: null,
         savingState: false,
         photoSavingState: false,
      }
   },
   watch: {
      user: {
         immediate: true,
         handler(val) {
            this.localUser = val
         }
      }
   },
   methods: {
      async updateDetails() {
         this.savingState = true
         try {
            await this.axios.post("/rider/profile", this.localUser)
            const toast = await toastController
               .create({
                  message: 'Profile Updated successfully',
                  duration: 2000,
                  position: 'top',
                  color: 'secondary'
               })
            toast.present()
            // this.$auth.setUser(res.data);
         } catch (error) {
            console.log(error)
         } finally {
            this.savingState = false
         }
      },
      async submitImage() {
         this.photoSavingState = true
         try {
            const formData = new FormData()
            formData.append("photo", this.photo)
            await this.axios.post("/rider/profile-photo", formData)

            const toast = await toastController
               .create({
                  message: 'Profile photo Updated successfully',
                  duration: 2000,
                  position: 'top',
                  color: 'secondary'
               })
            toast.present()

         } catch (error) {
            console.log(error)
         } finally {
            this.photoSavingState = false
         }
      }
   },

}
</script>

<style lang="scss" scoped>
</style>