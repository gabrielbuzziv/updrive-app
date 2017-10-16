<template>
    <div>
        <transition name="pageLoad">
            <div class="page" v-if="loaded && ! loading">
                <slot></slot>
            </div>
        </transition>

        <div class="page-loading margin-bottom-40" v-if="loading">
            <div class="loader page inline"></div>
            <span>Carregando</span>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            loading: {
                type: Boolean,
                default: false
            }
        },

        data () {
            return {
                loaded: false
            }
        },

        watch: {
            loading () {
                if (! this.loading) {
                    this.loaded = true
                }
            }
        },

        mounted () {
            if (! this.loading) {
                this.loaded = true
            }
        }
    }
</script>
