import Vue from 'vue'
import router from './router'
import store from 'common/vuex'
import 'libs'
import 'common/components'

window.Vue = Vue

import App from './App'

new Vue({
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
        if (this.$route.meta.auth) {
            this.$store.dispatch('auth/FETCH_USER')
                .then(response => {
                    this.$root.$emit('notifications::user', response.data.user.notifications.length)
                })
                .catch(() => {
                    this.$store.commit('auth/TOKEN', '')
                    this.$store.commit('auth/USER', '')

                    localStorage.clear()
                    this.$router.push('login')
                })
        }
    }
})