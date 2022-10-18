<template>
   <app-layout title="Profile">
      <ion-row>
         <ion-col @click="currentTab = 'profile'" :class="{'bg-primary text-white': currentTab == 'profile'}" class="ion-text-center rounded-col">Profile</ion-col>
         <ion-col @click="currentTab = 'verification'" :class="{'bg-primary text-white': currentTab == 'verification'}" class="ion-text-center rounded-col">Verification</ion-col>
         <ion-col @click="currentTab = 'address'" :class="{'bg-primary text-white': currentTab == 'address'}" class="ion-text-center rounded-col">Address</ion-col>
      </ion-row>
      <div style="height:10px;"></div>

      <component :user="user" :is="currentTab" @changeTab="changeTab"></component>

   </app-layout>
</template>

<script>
import {
   IonButton, IonSpinner, IonText,
   IonRow, IonCol
} from "@ionic/vue"
import AppLayout from "@/layouts/AppLayout.vue"
import Profile from './profile.vue'
import Verification from './verification.vue'
import Address from './address.vue'
export default {
   name: 'profile-page',
   components: {
      AppLayout, IonButton, IonSpinner, IonText,
      IonRow, IonCol, Profile, Verification, Address
   },
   data() {
      return {
         currentTab: 'profile'
      }
   },
   computed: {
      user() {
         return this.$store.state.auth.user
      }
   },

   methods: {

      changeTab(val) {
         this.currentTab = val
      }
   },
};
</script>

<style>
.rounded-col {
   border-radius: 20px;
   cursor: pointer;
}
</style>