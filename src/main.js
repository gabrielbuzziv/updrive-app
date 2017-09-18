import Vue from 'vue'
import router from './router'
import store from 'common/vuex'
import 'libs'
import 'common/components'

window.Vue = Vue

import App from './App'
import { isEmpty } from 'lodash'

new Vue ({
    router,
    store,
    el: '#app',
    render: h => h(App),

    computed: {
        user () {
            return this.$store.getters['auth/GET_USER']
        }
    },

    mounted () {
        if (! isEmpty(this.user)) {
            this.$store.dispatch('auth/FETCH_USER')
                .catch(() => {
                    this.$store.commit('auth/TOKEN', '')
                    this.$store.commit('auth/USER', '')

                    localStorage.clear()
                    this.$router.push('login')
                })
        }
    }
})