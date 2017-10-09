<template>
    <div class="main" :class="{ 'maximize': ! sidebar }">
        <div class="content">
            <slot></slot>

            <div class="clearfix"></div>
        </div>

        <send-documents />
        <composer />
    </div>
</template>

<script type="text/babel">
    import SendDocuments from '../../../scenes/updrive/views/partials/SendDocuments'
    import Composer from '../../../scenes/updrive/views/partials/Composer'

    export default {
        components: { SendDocuments, Composer },

        computed: {
            sidebar () {
                return this.$store.getters['global/GET_SIDEBAR']
            }
        },
    }
</script>
