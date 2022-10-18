<template>
   <app-layout>
      <!-- Spinner -->
      <div class="flex ion-justify-content-center ion-margin-vertical" v-if="loading">
         <ion-spinner name="bubbles"></ion-spinner>
      </div>

      <div v-else>
         <ion-row class="ion-text-center ion-margin-bottom">
            <ion-col>
               <ion-card>
                  <ion-card-header>
                     <ion-card-subtitle class="bold">Pending Orders</ion-card-subtitle>
                  </ion-card-header>
                  <ion-card-content>
                     {{pendingOrders}}
                  </ion-card-content>
               </ion-card>

            </ion-col>

            <ion-col>
               <ion-card>
                  <ion-card-header>
                     <ion-card-subtitle class="bold">Completed Orders</ion-card-subtitle>
                  </ion-card-header>
                  <ion-card-content>
                     {{completedOrders}}
                  </ion-card-content>
               </ion-card>
            </ion-col>
         </ion-row>
         <br>
         <apexchart type="line" height="400" :options="chartOptions" :series="series"></apexchart>
         <!-- <ion-card>
         </ion-card> -->
      </div>
   </app-layout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue"
import VueApexCharts from "vue3-apexcharts"

import {
   IonCard, IonCardHeader, IonRow, IonCol, IonCardSubtitle, IonCardContent,
   IonSpinner
} from "@ionic/vue"

export default {
   components: {
      AppLayout, IonCard, IonCardHeader, IonRow, IonCol, IonCardSubtitle, IonCardContent,
      apexchart: VueApexCharts, IonSpinner
   },
   data() {
      return {
         loading: true,

         pendingOrders: 0,
         completedOrders: 0,

         series: [{
            name: 'Assigned',
            type: 'column',
            data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8]
         }, {
            name: 'Delivered',
            type: 'column',
            data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5]
         }],
         chartOptions: {
            chart: {
               height: 350,
               type: 'line',
               stacked: false
            },
            dataLabels: {
               enabled: false
            },
            stroke: {
               width: [1, 1, 4]
            },

            xaxis: {
               categories: [],
            },

         }
      }
   },
   async created() {
      try {
         const res = await this.axios.get('/riders-home')

         this.pendingOrders = res.data.pendingCount
         this.completedOrders = res.data.completedCount

         const days = Object.keys(res.data.lastweekOrdersStat)
         this.chartOptions.xaxis.categories = days

         const assigned = days.map(d => res.data.lastweekOrdersStat[d].assigned)
         const delivered = days.map(d => res.data.lastweekOrdersStat[d].delivered)

         this.series[0].data = assigned
         this.series[1].data = delivered

      } catch (error) {
         console.log(error)
      } finally {
         this.loading = false
      }

   },
};
</script>

<style lang="scss" scoped>
</style>