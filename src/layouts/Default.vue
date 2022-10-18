<template>
   <ion-page>
      <ion-content @ionScroll="toggleFooter($event)">
         <app-body :show-footer="showFooter"></app-body>
      </ion-content>
   </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue"
import AppBody from "@/layouts/AppBody.vue"
export default {
   props: {
      title: {
         type: String,
         required: false,
         default: "",
      },
   },
   data() {
      return {
         showFooter: true,
      }
   },
   components: {
      IonPage,
      IonContent,
      AppBody,
   },
   methods: {
      toggleFooter() {
         // const scrollTop = event.detail.scrollTop
         // this.showFooter = scrollTop > 50 ? false : true
      },
   },
};
</script>

<style lang="scss" scoped>
</style>