<template>
   <ion-page>
      <ion-content class="ion-padding">
         <ion-row class="ion-align-items-center">
            <ion-col>
               <h1>Sign Up</h1>
            </ion-col>
            <!-- <ion-col class="ion-text-end">
               <router-link to="/signin" class="signup-btn">Signin</router-link>
            </ion-col> -->
         </ion-row>
         <p>Create your free account</p>

         <form @submit.prevent="signup">
            <!-- First Name -->
            <input-field v-model="form.firstName" placeholder="Your First Name" label="First Name" :error="validationErrors.firstName"></input-field>
            <!-- Last Name -->
            <input-field v-model="form.lastName" placeholder="Your Last Name" label="Last Name" :error="validationErrors.lastName"></input-field>
            <!-- Email -->
            <input-field v-model="form.email" placeholder="Your Email" type="email" label="Email" :error="validationErrors.email"></input-field>
            <!-- Phone Number -->
            <input-field v-model="form.phone" placeholder="Your Phone Number" type="tel" label="Phone Number" :error="validationErrors.phone"></input-field>

            <!-- Password -->
            <ion-label position="stacked">Password</ion-label>
            <div class="input-control ">
               <ion-input v-model="form.password" :type="`${passwordVisible ? 'text': 'password'}`" placeholder="Password"></ion-input>
               <div class="input-icon-right">
                  <font-awesome-icon @click="passwordVisible =false" v-if="passwordVisible" :icon="faEyeSlash" />
                  <font-awesome-icon @click="passwordVisible =true" v-else :icon="faEye" />
               </div>
            </div>
            <p v-if="validationErrors.password" class="mt-5 text-danger">{{ validationErrors.password[0] }}</p>

            <div style="height: 15px;"></div>
            <!-- Confirm Password -->
            <ion-label position="stacked">Confirm Password</ion-label>
            <ion-input class="ion-margin-bottom" v-model="form.password_confirmation" type="password" placeholder="Confirm Password"></ion-input>

            <div style="height: 15px;"></div>
            <p class="text-secondary text-medium ion-text-center">Please select your working zone</p>

            <!-- Select City -->
            <select-field v-model="selectedCity" @change="getZones" track="self" title="self" :options="cities" :error="validationErrors.selectedCity" label="Select City" placeholder="Select City"></select-field>

            <div style="height: 15px;"></div>

            <!-- Select Zone -->
            <select-field v-model="form.zoneId" :options="zones" label="Select Zone" :error="validationErrors.zoneId" placeholder="Select Zone"></select-field>

            <div style="height: 30px;"></div>

            <!-- Upload Identity -->
            <!-- <ion-label class="" position="stacked">Upload Identity</ion-label> -->

            <!-- Terms & condition -->
            <ion-row>
               <ion-col size="1">
                  <ion-checkbox v-model="termsConditions" color="primary"></ion-checkbox>
               </ion-col>
               <ion-col>By doing signup you agree with all Terms & Conditions</ion-col>
            </ion-row>

            <div style="height: 20px;"></div>

            <ion-button :disabled="savingState" type="submit" expand="block" class="text-white">
               <ion-spinner v-if="savingState"></ion-spinner>
               <ion-text v-else>Sign Up</ion-text>
            </ion-button>

            <div style="height: 15px;"></div>
            <p class="ion-text-center">Already a rider? <router-link to="/signin">Sign In</router-link>
            </p>

         </form>
      </ion-content>
   </ion-page>
</template>

<script>
import {
   IonInput, IonLabel, IonPage, IonContent,
   IonButton, IonRow, IonCol,
   IonCheckbox, IonSpinner, IonText, toastController
} from '@ionic/vue'

import { mapGetters } from "vuex"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import validation from '@/mixins/validation'
import InputField from '@/components/form/InputField'
import SelectField from '@/components/form/SelectField'

export default {
   components: {
      IonInput, IonLabel, IonPage, IonContent, SelectField,
      IonButton, IonRow, IonCol, FontAwesomeIcon, InputField,
      IonCheckbox, IonSpinner, IonText,
   },
   mixins: [validation],
   data() {
      return {
         faFacebookF, faTwitter, faEye, faEyeSlash,
         passwordVisible: false,
         selectedCity: null,
         zones: [],
         termsConditions: true,
         savingState: false,
         form: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: "",
            zoneId: null
         }
      }
   },
   computed: {
      ...mapGetters({
         cities: "config/getCities"
      })
   },
   methods: {
      // get zones from the cities
      async getZones() {
         try {
            const res = await this.axios.get(`/zones?city=${this.selectedCity}`)
            this.zones = res.data.data
         } catch (error) {
            console.error(error)
         }
      },
      async signup() {
         this.savingState = true
         try {
            await this.axios.post("/rider/register", this.form)
            await this.auth.login({
               url: '/rider/login',
               data: this.form
            })
            this.$router.replace("/")
            const toast = await toastController
               .create({
                  message: 'Sign Up Successfully',
                  duration: 2000,
                  color: 'secondary'
               })
            toast.present()
         } catch (error) {
            console.log(error)
         } finally {
            this.savingState = false
         }
      },
   },
}
</script>

<style>
</style>