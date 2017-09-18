<template>
    <panel class="tab-content" :title="title" v-show="isActive" ref="content">
        <slot></slot>
    </panel>
</template>

<script type="text/babel">
    export default {
        props: {
            tab: {
                type: String,
                required: true
            },

            title: {
                type: String
            },

            active: {
                type: Boolean,
                default: false
            }
        },

        data () {
            return {
                isActive: false
            }
        },

        watch: {
            active () {
                this.isActive = this.active
            }
        },

        methods: {
            activate () {
                this.isActive = true

                setTimeout(() => this.$refs.content.$el.querySelector('input').focus(), 1)
            },

            disactivate () {
                this.isActive = false
            }
        },

        mounted () {
            this.isActive = this.active

            this.$root.$on('show::tab', tab => tab == this.tab ? this.activate() : this.disactivate())
        },

        beforeDestroy () {
            this.$root.$off('show::tab')
        }
    }
</script>
