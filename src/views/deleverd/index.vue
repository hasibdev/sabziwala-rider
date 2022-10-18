<template>
   <app-layout>
      <!-- Skeleton -->
      <ion-list v-if="!dataLoaded">
         <ion-item v-for="x in 8" :key="x">
            <ion-label>
               <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
               <ion-skeleton-text animated style="width: 80%"></ion-skeleton-text>
               <ion-skeleton-text animated style="width: 40%"></ion-skeleton-text>
            </ion-label>
            <ion-note slot="end">
               <ion-skeleton-text animated style="width: 30px"></ion-skeleton-text>
            </ion-note>
         </ion-item>
      </ion-list>

      <p v-if="dataLoaded && !orders.length">No Orders found!</p>

      <!-- Main Content -->
      <ion-list>
         <ion-item button detail v-for="order in orders" @click="$router.push(`/deleverd/${order.id}`)" :key="order.id">
            <ion-label>
               <h2>{{ order.customer.name }}</h2>
               <p>{{ formatAddress(order.address) }}</p>
            </ion-label>

         </ion-item>
      </ion-list>

      <ion-infinite-scroll @ionInfinite="loadData($event)" threshold="100px" id="infinite-scroll" :disabled="isDisabled">
         <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data...">
         </ion-infinite-scroll-content>
      </ion-infinite-scroll>
   </app-layout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue"
import {
   IonInfiniteScroll,
   IonInfiniteScrollContent,
   IonItem,
   IonLabel,
   IonList,
   IonSkeletonText,
   IonNote
} from "@ionic/vue"
import { defineComponent, ref } from "vue"
import axios from "@/plugins/axios"

export default defineComponent({
   components: {
      IonInfiniteScroll,
      IonInfiniteScrollContent,
      IonItem,
      IonLabel,
      IonList,
      AppLayout,
      IonSkeletonText, IonNote
   },
   setup() {
      const isDisabled = ref(false)
      const dataLoaded = ref(false)
      const toggleInfiniteScroll = () => {
         isDisabled.value = !isDisabled.value
      }
      const orders = ref([])
      const currnetPage = ref(0)
      const pushData = (payload) => {
         for (let i = 0; i < payload.length; i++) {
            orders.value.push(payload[i])
         }
      }

      const loadData = async (event = null) => {
         currnetPage.value = currnetPage.value + 1
         try {
            const res = await axios.get(
               "/orders/delivered/get?page=" + currnetPage.value
            )

            pushData(res.data.data)
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (event) {
               if (res.data.meta.last_page < currnetPage.value) {
                  event.target.disabled = true
               }
               event.target.complete()
            }
         } catch (error) {
            console.log(error)
         } finally {
            dataLoaded.value = true
         }
      }

      loadData()

      // Formate Address
      const formatAddress = (val) => {
         const ad = val.find(a => a.type == 'shipping_address')
         return `${ad.street}, ${ad.city}, ${ad.country}`
      }

      return {
         isDisabled,
         toggleInfiniteScroll,
         loadData, dataLoaded,
         orders, formatAddress
      }
   },
});
</script>

<style lang="scss" scoped>
</style>