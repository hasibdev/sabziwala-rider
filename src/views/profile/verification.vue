<template>
    <div>
        <!-- Verification Notic -->
        <div class="bg-grey verification-notic">
            <p>
                The following documents will be used to verify your identity.
                <br>
                <span class="bold">
                    Please attach all the real documents.
                </span>
            </p>
        </div>
        <!-- Verification Notic -->
        <div>
            <p class="bg-green-100 p-5 mt-5" v-if="localUser.verified == 0 && localUser.verificationFrontUrl.length">
                <span class="font-semibold">
                    Your verification is in progress.
                </span>
                <br>
                Thank you for submitting the documents.
                We will verify the documents as soon as possible.
            </p>
        </div>

        <!-- Notice -->
        <div class="ion-margin-top">
            <p class="text-secondary text-medium ion-no-margin">* Attach your NID / PASSPORT / DRIVING LICENCE verificable documents here. </p>
            <div style="height: 5px;"></div>
            <p class="text-secondary text-medium ion-no-margin">* Image should be 1:1 acpect ratio. Maximum file size: 10MB(10240KB).</p>
        </div>

        <div style="height: 25px;"></div>

        <!-- Documents -->
        <div class="">
            <div class="">
                <h6 class="text-grey bold">Front side</h6>
                <image-attach-field class="" v-model="form.frontImage" :url="localUser.verificationFrontUrl"></image-attach-field>
            </div>

            <div class="">
                <h6 class="text-grey bold">Back side</h6>
                <image-attach-field class="" v-model="form.backImage" :url="localUser.verificationBackUrl"></image-attach-field>
            </div>
        </div>

        <div style="height: 25px;"></div>

        <ion-button :disabled="savingState || (form.frontImage == null || form.backImage == null)" @click="submitDocuments" expand="block" class="text-white">
            <ion-spinner v-if="savingState"></ion-spinner>
            <ion-text v-else>Submit Document</ion-text>
        </ion-button>

    </div>
</template>

<script>
import { IonSpinner, IonText, IonButton, } from '@ionic/vue'
import ImageAttachField from '@/components/form/ImageAttachField.vue'
export default {
    props: ['user'],
    components: {
        IonSpinner, IonText, IonButton,
        ImageAttachField,
    },
    data() {
        return {
            localUser: null,
            savingState: false,
            form: {
                frontImage: null,
                backImage: null
            }
        }
    },
    watch: {
        user: {
            immediate: true,
            handler(val) {
                this.localUser = val
            }
        }
    },
    methods: {
        submitDocuments() {
            console.log('Submit')
        }
    },
}
</script>

<style lang="scss" scoped>
</style>