<template>
    <div class="selector-options-option" :class="{ 'hover': hover }" @click.stop="onClick">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            hover: Boolean,
            option: Object,
            label: String,
            value: String,
        },

        methods: {
            onClick() {
                return this.$emit('click')
            }
        }
    }
</script>
