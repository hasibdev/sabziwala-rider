import { createStore } from 'vuex'
import auth from './auth'
import config from './config'
import validation from './validation'

const store = createStore({
    state() {
        return {

        }
    },

    modules: {
        auth,
        config,
        validation
    }
})

export default store