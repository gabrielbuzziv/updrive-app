<template>
    <ul :class="dataListClass">
        <slot></slot>
    </ul>
</template>

<script type="text/babel">
    export default {
        props: {
            vertical: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            dataListClass () {
                return ['data-list', this.vertical ? 'data-list-vertical' : '']
            }
        }
    }
</script>
