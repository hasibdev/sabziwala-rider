<template>
   <div class="ion-margin-bottom">
      <ion-label :position="position">{{ label }}</ion-label>
      <ion-input @input="onChange" :value="modelValue" :class="{'border-danger': (error && error[0])}" :type="type" :placeholder="placeholder"></ion-input>
      <p v-if="error" class="mt-5 text-danger">{{ error[0] }}</p>
   </div>
</template>

<script>
import {
   IonInput, IonLabel,
} from '@ionic/vue'

export default {
   emits: ['update:modelValue'],
   components: {
      IonInput, IonLabel,
   },
   props: {
      modelValue: {
         type: [String, Number],
      },
      label: {
         type: String,
      },
      type: {
         type: String,
         default: 'text'
      },
      placeholder: {
         type: String,
         default: ''
      },
      position: {
         type: String,
         default: 'stacked'
      },
      error: {
         type: [String, Array],
      },
   },
   methods: {
      onChange(e) {
         this.$emit('update:modelValue', e.target.value)
      }
   },
}
</script>

<style lang="scss" scoped>
</style>