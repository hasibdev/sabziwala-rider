<template>
   <ion-tabs>
      <!-- Page Body -->
      <ion-router-outlet></ion-router-outlet>
      <!-- Page Footer -->
      <transition name="fadeIn">
         <ion-footer v-if="showFooter">
            <ion-tab-bar content="bottom">

               <ion-tab-button tab="Home" href="/home">
                  <ion-icon :icon="homeOutline" />
                  <ion-label>Home</ion-label>
               </ion-tab-button>

               <ion-tab-button tab="Orders" href="/orders">
                  <ion-icon :icon="restaurantOutline" />
                  <ion-label>Orders</ion-label>
               </ion-tab-button>

               <ion-tab-button tab="Deleverd" href="/deleverd">
                  <ion-icon :icon="cartOutline" />
                  <ion-label>Deleverd</ion-label>
               </ion-tab-button>

            </ion-tab-bar>
         </ion-footer>
      </transition>
   </ion-tabs>
</template>

<script>
import {
   IonIcon,
   IonTabs,
   IonTabBar,
   IonTabButton,
   IonLabel,
   IonRouterOutlet,
   IonFooter,
} from "@ionic/vue"
import {
   homeOutline,
   cartOutline,
   restaurantOutline,
   personOutline,
} from "ionicons/icons"
export default {
   props: {
      showFooter: {
         type: Boolean,
         default: true,
      },
   },
   components: {
      IonIcon,
      IonTabs,
      IonTabBar,
      IonTabButton,
      IonLabel,
      IonRouterOutlet,
      IonFooter,
   },
   data() {
      return {
         homeOutline,
         cartOutline,
         restaurantOutline,
         personOutline,
      }
   },
};
</script>

<style lang="scss" scoped>
ion-tab-bar {
   padding-top: 8px;
   padding-bottom: 8px;
   ion-tab-button > ion-label {
      font-size: 13px;
   }
}
</style>