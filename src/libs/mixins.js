import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { find, isEmpty } from 'lodash'

Vue.mixin({
    filters: {
        lowerCase (value) {
            return value.toLowerCase()
        },

        capitalize (value) {
            return value.charAt(0).toUpperCase() + value.slice(1)
        },

        firstWord (value) {
            return value.split(' ')[0]
        },

        pad (number, size) {
            if (! ! number) {
                const zeros = Array(size).join(0)
                return (`${zeros}${number}`).slice(- size)
            }
        },
    },

    computed: {
        env () {
            return window.env
        }
    },

    methods: {
        userCan (permission) {
            const permissions = this.$store.getters['auth/GET_USER'].permissions

            return find(permissions, p => p == permission)
        },

        phoneMask (phone) {
            if (! isEmpty(phone) && phone.length > 14) {
                    return '(##) #####-####'
            }

            return '(##) ####-####?#'
        },

        taxvatMask (taxvat) {
            if (! isEmpty(taxvat) && taxvat.length > 14) {
                return '##.###.###/####-##'
            }

            return '###.###.###-##?#'
        },

        validated() {
            this.$store.dispatch('global/SET_VALIDATION_ERROR', [])
        },

        pad (number, size) {
            if (! ! number) {
                const zeros = Array(size).join(0)
                return (`${zeros}${number}`).slice(- size)
            }
        },
    }
})