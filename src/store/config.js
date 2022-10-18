import axios from "@/plugins/axios"

export default {
    namespaced: true,
    state: () => ({
        settings: null,
        enums: null,
        options: null,
        appearances: null,
        howItWorks: null,
        workWithUs: null,
        riderFaqs: null,
        aboutFaqs: null,
        whyChooseUs: null,
        featureProducts: [],
        cities: []
    }),

    getters: {
        getRiderHeroSection(state) {
            return state.appearances && state.appearances.find(item => item.name == 'rider_hero')
        },

        getRiderAppSection(state) {
            return state.appearances && state.appearances.find(item => item.name == 'rider_apps')
        },
        getRiderFaqs(state) {
            return state.riderFaqs
        },
        getCurrency(state) {
            return state.settings && state.settings.find(item => item.name == 'currency')
        },
        getPaymentMethod(state) {
            return state.enums && state.enums.paymentMethod
        },
        getCities(state) {
            return state.cities
        },
    },

    mutations: {
        SET_STATE(state, config) {
            state.settings = config.settings
            state.enums = config.enums
            state.options = config.options
            state.appearances = config.appearances
            state.howItWorks = config.howItWorks
            state.workWithUs = config.workWithUs
            state.riderFaqs = config.riderFaqs
            state.aboutFaqs = config.aboutFaqs
            state.whyChooseUs = config.whyChooseUs
            state.featureProducts = config.featureProducts
            state.cities = config.cities
        }
    },
    actions: {
        async setConfig({ commit }, { url }) {
            try {
                const resConfig = await axios.get(url)
                commit("SET_STATE", resConfig.data.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
}

