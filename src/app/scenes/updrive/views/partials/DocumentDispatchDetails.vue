<template>
    <el-dialog :title="`${dispatch.subject}`" :visible.sync="visible">
        <page-load id="document-dispatch-details" :loading="loading">
            <div v-html="dispatch.message" v-if="dispatch.message && dispatch.message.length"></div>
            <div v-else>
                <em>Não foi adicionada mensagem ao corpo do e-mail.</em>
            </div>
        </page-load>
    </el-dialog>
</template>

<script>
    import services from '../../services'

    export default {
        data () {
            return {
                dispatch: {},
                loading: true,
                visible: false
            }
        },

        methods: {
            load (id) {
                this.visible = true
                this.loading = true
                services.getDispatchDetails(id)
                    .then(response => {
                        this.dispatch = response.data
                        this.loading = false
                    })
                    .catch(() => this.loading = false)
            }
        },

        mounted () {
            this.$root.$on('details::dispatch', id => this.load(id))
        },

        beforeDestroy () {
            this.$root.$off('details::dispatch')
        }
    }
</script>