<template>
    <router-link :to="to" :tag="tag" :exact="exact">
        <slot></slot>
    </router-link>
</template>

<script type="text/babel">
    export default {
        props: {
            href: {
                type: String,
                required: true,
            },

            params: {
                type: Object
            },

            tag: String,

            exact: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            to () {
                const name = this.href
                const params = this.params || {}

                return { name: name, params: params }
            }
        }
    }
</script>