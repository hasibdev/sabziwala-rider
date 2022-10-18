import { mapGetters } from "vuex"

export default {
    computed: {
        ...mapGetters({
            validationErrors: "validation/validationErrors"
        })
    }
}