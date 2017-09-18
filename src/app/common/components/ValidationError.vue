<template>
    <transition name="fade">
        <div class="alert alert-danger alert-validation" v-show="hasError">
            <button class="close" type="button" @click="onClose">
                <i class="mdi mdi-close"></i>
            </button>

            <ul class="errors">
                <li v-for="error in errors">
                    {{ error[0] }}
                </li>
            </ul>
        </div>
    </transition>
</template>

<script type="text/babel">
    import { isEmpty } from 'lodash'

    export default {
        computed: {
            errors () {
                return this.$store.getters['global/GET_VALIDATION_ERROR']
            },

            hasError () {
                return ! isEmpty(this.errors)
            }
        },

        methods: {
            onClose () {
                this.$store.dispatch('global/SET_VALIDATION_ERROR', {})
            }
        }
    }
</script>
