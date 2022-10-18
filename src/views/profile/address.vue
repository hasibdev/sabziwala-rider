<template>
   <div>
      <!-- Verification Notic -->
      <div class="bg-grey verification-notic">
         <p>The following addresses will be used on the checkout page by default.</p>
      </div>

      <div style="height: 20px;"></div>

      <!-- Form -->
      <form @submit.prevent="saveAddress">
         <!-- Present Address -->
         <h3>Present Address</h3>
         <!-- Street -->
         <ion-label class="" position="stacked">Street</ion-label>
         <ion-input v-model="form.presentAddress.street" class="ion-margin-bottom" type="text" required></ion-input>
         <!-- City -->
         <ion-label class="" position="stacked">City</ion-label>
         <ion-input v-model="form.presentAddress.city" class="ion-margin-bottom" type="text" required></ion-input>
         <!-- State -->
         <ion-label class="" position="stacked">State</ion-label>
         <ion-input v-model="form.presentAddress.state" class="ion-margin-bottom" type="text" required></ion-input>
         <!-- Zip Code -->
         <ion-label class="" position="stacked">Zip-Code</ion-label>
         <ion-input v-model="form.presentAddress.zipcode" class="ion-margin-bottom" type="text" required></ion-input>

         <!-- Country -->
         <ion-label class="" position="stacked">Country</ion-label>
         <ion-select v-model="form.presentAddress.country" placeholder="Select Country" :value="null" ok-text="Okay" cancel-text="Dismiss">
            <ion-select-option v-for="(country, i) in countries" :key="i" :value="country">{{ country }}</ion-select-option>
         </ion-select>

         <div class="ion-margin-vertical">
            <ion-checkbox @ionChange="setPermanent" v-model="permanentIsSame"></ion-checkbox>
            <ion-label style="margin-left: 10px;">
               <strong>Permanent address</strong> is same as <strong>Present address</strong>
            </ion-label>
         </div>

         <!-- Permanent Address -->
         <template v-if="!permanentIsSame">
            <h3>Permanent Address</h3>
            <!-- Street -->
            <ion-label class="" position="stacked">Street</ion-label>
            <ion-input v-model="form.permanentAddress.street" class="ion-margin-bottom" type="text" required></ion-input>
            <!-- City -->
            <ion-label class="" position="stacked">City</ion-label>
            <ion-input v-model="form.permanentAddress.city" class="ion-margin-bottom" type="text" required></ion-input>
            <!-- State -->
            <ion-label class="" position="stacked">State</ion-label>
            <ion-input v-model="form.permanentAddress.state" class="ion-margin-bottom" type="text" required></ion-input>
            <!-- Zip Code -->
            <ion-label class="" position="stacked">Zip-Code</ion-label>
            <ion-input v-model="form.permanentAddress.zipcode" class="ion-margin-bottom" type="text" required></ion-input>

            <!-- Country -->
            <ion-label class="" position="stacked">Country</ion-label>
            <ion-select v-model="form.permanentAddress.country" placeholder="Select Country" :value="null" ok-text="Okay" cancel-text="Dismiss">
               <ion-select-option v-for="(country, i) in countries" :key="i" :value="country">{{ country }}</ion-select-option>
            </ion-select>
         </template>

         <div style="height:30px;"></div>

         <ion-button :disabled="savingState" type="submit" expand="block" class="text-white">
            <ion-spinner v-if="savingState"></ion-spinner>
            <ion-text v-else>Save</ion-text>
         </ion-button>
      </form>
   </div>
</template>

<script>
import { IonLabel, IonInput, IonSpinner, IonText, IonButton, toastController, IonSelect, IonSelectOption, IonCheckbox } from '@ionic/vue'
export default {
   components: {
      IonLabel, IonInput, IonSpinner, IonText, IonButton, IonSelect, IonSelectOption, IonCheckbox
   },
   data() {
      return {
         form: {
            presentAddress: {
               street: '',
               city: '',
               state: '',
               zipcode: '',
               country: '',
            },
            permanentAddress: {
               street: '',
               city: '',
               state: '',
               zipcode: '',
               country: '',
            },
         },
         permanentIsSame: false,
         savingState: false,
         countries: [],
      }
   },
   props: ['user'],
   methods: {
      async saveAddress() {
         this.savingState = true
         try {
            await this.axios.post("/rider/address", this.form)
            const toast = await toastController
               .create({
                  message: 'Address Updated successfully',
                  duration: 2000,
                  position: 'top',
                  color: 'secondary'
               })
            toast.present()
         } catch (error) {
            console.log(error)
         } finally {
            this.savingState = false
         }

         // this.$auth.setUser(resAddress.data)
         // this.$toast.success("Address updated successfully")           
      },
      setPermanent() {
         if (this.permanentIsSame) {
            this.form.permanentAddress = { ...this.form.presentAddress }
         }
      },
      fillForm(user) {
         this.form = {
            presentAddress: {
               ...user.presentAddress
            },
            permanentAddress: {
               ...user.permanentAddress
            },
         }
      }
   },
   async created() {
      const resCountries = await this.axios.get("/countries")
      this.countries = resCountries.data
   },
   watch: {
      user: {
         immediate: true,
         handler(val) {
            if (val) {
               this.fillForm(val)
            }
         }
      }
   },
}
</script>

<style lang="scss" scoped>
</style>