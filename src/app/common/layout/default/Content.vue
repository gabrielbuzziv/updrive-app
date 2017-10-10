<template>
    <div class="main" :class="{ 'maximize': ! sidebar }">
        <div class="content">
            <slot></slot>

            <div class="clearfix"></div>
        </div>

        <composer />
    </div>
</template>

<script type="text/babel">
    import Composer from '../../../scenes/updrive/views/partials/Composer'

    export default {
        components: { Composer },

        computed: {
            sidebar () {
                return this.$store.getters['global/GET_SIDEBAR']
            }
        },
    }
</script>
