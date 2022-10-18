<template>
   <div class="ion-margin-bottom">
      <ion-label :position="position">{{ label }}</ion-label>
      <ion-select :class="{'border-danger': (error && error[0])}" :value="modelValue" @ionChange="onChange" ok-text="Okay" cancel-text="Dismiss" :placeholder="placeholder">
         <ion-select-option v-for="(opt, i) in options" :key="i" :value="getValue(opt)">{{getTitle(opt)}}</ion-select-option>
      </ion-select>
      <p v-if="error" class="mt-5 text-danger">{{ error[0] }}</p>
   </div>
</template>

<script>
import {
   IonLabel, IonSelect, IonSelectOption,
} from '@ionic/vue'

export default {
   emits: ['update:modelValue', 'change'],
   components: {
      IonLabel, IonSelect, IonSelectOption,
   },
   props: {
      label: {
         type: String,
      },
      modelValue: {
         type: [String, Number, Array, Object],
      },
      track: {
         type: String,
         default: 'id'
      },
      title: {
         type: String,
         default: 'name'
      },
      options: {
         type: [Array],
      },
      position: {
         type: String,
         default: 'stacked'
      },
      placeholder: {
         type: String,
         default: 'Please Select'
      },
      error: {
         type: [String, Array],
      },
   },
   methods: {
      onChange(e) {
         this.$emit('update:modelValue', e.target.value)
         this.$emit('change', e.target.value)
      },
      getValue(opt) {
         if (this.track == 'self') {
            return opt
         }
         return opt[this.track]
      },
      getTitle(opt) {
         if (this.track == 'self') {
            return opt
         }
         return opt[this.title]
      }
   },
}
</script>

<style lang="scss" scoped>
</style>