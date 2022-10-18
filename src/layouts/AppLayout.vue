<template>
   <ion-page>
      <!-- Page Header -->
      <transition name="fadeIn">
         <app-header :abletoBack="abletoBack" v-if="showHeader">{{ title }}</app-header>
      </transition>
      <!-- Page Content -->
      <ion-content class="ion-padding" scroll-events @ionScroll="toggleNav($event)">
         <slot />
      </ion-content>
   </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue"
import AppHeader from "@/layouts/AppHeader.vue"
export default {
   props: {
      title: {
         type: String,
         required: false,
         default: "SabziWaley",
      },
      abletoBack: {
         type: Boolean,
         default: false
      }
   },
   data() {
      return {
         showHeader: true,
      }
   },
   components: {
      IonPage,
      AppHeader,
      IonContent,
   },
   methods: {
      toggleNav() {
         // const scrollTop = event.detail.scrollTop;
         // this.showHeader = scrollTop > 50 ? false : true;
      },
   },
};
</script>

<style lang="scss" scoped>
</style>