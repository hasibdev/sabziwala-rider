<template>
   <ion-header class="ion-no-border">
      <ion-toolbar color="white">
         <ion-buttons slot="start">
            <ion-back-button v-if="abletoBack" defaultHref="/home"></ion-back-button>

            <img :src="require('@/assets/img/logo.png')" style="height: 2.5rem; padding-left: 10px;">

         </ion-buttons>
         <ion-title>
            <slot />
         </ion-title>

         <ion-buttons slot="primary">

            <ion-button @click="setOpen(true, $event)">
               <ion-icon slot="start" :icon="ellipsisVerticalOutline"></ion-icon>
            </ion-button>

            <ion-popover :is-open="isOpenRef" css-class="my-custom-class" :event="event" :showBackdrop="false" @didDismiss="setOpen(false)">
               <ion-content>
                  <ion-list lines="none">
                     <ion-item @click="$router.push('/profile')" :button="true">
                        <ion-icon slot="start" :icon="personCircle"></ion-icon>
                        <ion-label>Profile</ion-label>
                     </ion-item>
                     <ion-item @click="signout" :button="true">
                        <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
                        <ion-label>Sign Out</ion-label>
                     </ion-item>
                  </ion-list>
               </ion-content>
            </ion-popover>
         </ion-buttons>
      </ion-toolbar>
   </ion-header>
</template>

<script>
import {
   IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonIcon, IonButton, IonPopover, IonContent,
   IonList, IonItem, toastController, IonLabel
} from "@ionic/vue"
import { useRoute, useRouter } from "vue-router"
import { ref } from 'vue'
import { useStore } from 'vuex'
import {
   personCircle, ellipsisVerticalOutline, logOutOutline
} from "ionicons/icons"
export default {
   components: {
      IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonIcon, IonButton, IonPopover, IonContent,
      IonList, IonItem, IonLabel
   },
   props: {
      abletoBack: {
         type: Boolean,
         default: false
      }
   },
   setup() {
      const route = useRoute()
      const router = useRouter()
      const store = useStore()

      // Popover setup
      const isOpenRef = ref(false)
      const event = ref()
      const setOpen = (state, ev) => {
         event.value = ev
         isOpenRef.value = state
      }

      // Signout Method
      async function signout() {
         try {
            await store.dispatch('auth/logout')
            router.replace("/signin")
            const toast = await toastController.create({
               message: "Signout Successfull",
               duration: 2000,
               color: "secondary",
            })
            toast.present()
         } catch (error) {
            console.log(error)
         }
      }

      return {
         ellipsisVerticalOutline, logOutOutline,
         route, personCircle, event, isOpenRef,
         setOpen, signout
      }
   },
};
</script>

<style lang="scss" scoped>
ion-toolbar {
   box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000,
      0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
   --padding-bottom: 1rem;
   --padding-top: 1rem;
   --padding-start: 1rem;
   --padding-end: 1rem;
}
</style>