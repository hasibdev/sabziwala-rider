<template>
   <app-layout title="Order Details" abletoBack>
      <!-- Spinner -->
      <div class="flex ion-justify-content-center ion-margin-vertical" v-if="!order">
         <ion-spinner name="bubbles"></ion-spinner>
      </div>

      <div v-if="order">
         <ion-card>
            <ion-card-content>
               <ion-row>
                  <ion-col size="4" class="bold">Date</ion-col>
                  <ion-col>{{order.dateFormatted}}</ion-col>
               </ion-row>
               <ion-row>
                  <ion-col size="4" class="bold">Invoice No</ion-col>
                  <ion-col>{{order.invoiceNo}}</ion-col>
               </ion-row>
               <ion-row>
                  <ion-col size="4" class="bold">Zone</ion-col>
                  <ion-col>{{order.zoneId}}</ion-col>
               </ion-row>
               <ion-row>
                  <ion-col size="4" class="bold">Status</ion-col>
                  <ion-col>
                     <ion-badge :color="order.status == 'delivered' ? 'success' : 'primary'">{{order.status}}</ion-badge>
                  </ion-col>
               </ion-row>
               <ion-row>
                  <ion-col size="4" class="bold">Note</ion-col>
                  <ion-col>{{order.note}}</ion-col>
               </ion-row>
            </ion-card-content>
         </ion-card>

         <ion-card>
            <ion-card-content>
               <ion-row>
                  <ion-col size="4" class="bold">Grand Total</ion-col>
                  <ion-col>{{order.grandTotalFormatted}}</ion-col>
               </ion-row>
               <ion-row>
                  <ion-col size="4" class="bold">Sub Total</ion-col>
                  <ion-col>{{order.subTotalFormatted}}</ion-col>
               </ion-row>
               <ion-row>
                  <ion-col size="4" class="bold">Discount</ion-col>
                  <ion-col>{{order.totalDiscountFormatted}}</ion-col>
               </ion-row>
            </ion-card-content>
         </ion-card>

         <ion-card>
            <ion-card-header>
               <ion-card-title class="ion-color-primary">Customer Info</ion-card-title>
            </ion-card-header>
            <ion-card-content>
               <ion-row>
                  <ion-col size="4" class="bold">Name</ion-col>
                  <ion-col>{{order.customer.name}}</ion-col>
               </ion-row>
               <ion-row>
                  <ion-col size="4" class="bold">Phone</ion-col>
                  <ion-col>{{order.customer.phone}}</ion-col>
               </ion-row>
               <ion-row>
                  <ion-col size="4" class="bold">Email</ion-col>
                  <ion-col>{{order.customer.email}}</ion-col>
               </ion-row>

            </ion-card-content>
         </ion-card>

         <ion-card>
            <ion-card-header>
               <ion-card-title class="ion-color-primary">Shipping Address</ion-card-title>
            </ion-card-header>
            <ion-card-content>
               <ion-row>
                  <ion-col size="4" class="bold">Street</ion-col>
                  <ion-col>{{order.shippingAddress.street}}</ion-col>
               </ion-row>
               <ion-row>
                  <ion-col size="4" class="bold">City</ion-col>
                  <ion-col>{{order.shippingAddress.city}}</ion-col>
               </ion-row>
               <ion-row>
                  <ion-col size="4" class="bold">Country</ion-col>
                  <ion-col>{{order.shippingAddress.country}}</ion-col>
               </ion-row>

            </ion-card-content>
         </ion-card>

         <ion-card>
            <ion-card-header>
               <ion-card-title class="ion-color-primary">Billing Address</ion-card-title>
            </ion-card-header>
            <ion-card-content>
               <ion-row>
                  <ion-col size="4" class="bold">Street</ion-col>
                  <ion-col>{{order.billingAddress.street}}</ion-col>
               </ion-row>
               <ion-row>
                  <ion-col size="4" class="bold">City</ion-col>
                  <ion-col>{{order.billingAddress.city}}</ion-col>
               </ion-row>
               <ion-row>
                  <ion-col size="4" class="bold">Country</ion-col>
                  <ion-col>{{order.billingAddress.country}}</ion-col>
               </ion-row>
            </ion-card-content>
         </ion-card>
      </div>
   </app-layout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue"

import { defineComponent } from "vue"
import {
   IonRow, IonCol, IonSpinner, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
   IonBadge
} from "@ionic/vue"
export default defineComponent({
   components: {
      AppLayout, IonRow, IonCol, IonSpinner, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
      IonBadge
   },
   data() {
      return {
         order: null
      }
   },
   async created() {
      try {
         const res = await this.axios.get(`/orders/${this.$route.params.id}/assigned`)
         this.order = res.data.data
      } catch (error) {
         console.log(error)
      }
   },

});
</script>

<style lang="scss" scoped>
</style>