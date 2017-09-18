<template>
    <div class="main" :class="{ 'maximize': ! sidebar }">
        <div class="content">
            <slot></slot>

            <div class="clearfix"></div>
        </div>

        <send-documents />
    </div>
</template>

<script type="text/babel">
    import SendDocuments from '../../../scenes/updrive/views/partials/SendDocuments'

    export default {
        components: { SendDocuments },

        computed: {
            sidebar () {
                return this.$store.getters['global/GET_SIDEBAR']
            }
        },
    }
</script>
