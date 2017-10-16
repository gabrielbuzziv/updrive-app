<template>
    <el-dialog :title="`Detalhes do ${document.name}`" :visible.sync="visible">



        <template slot="footer">
            <button class="btn btn-default" @click.prevent="close">
                Fechar
            </button>
        </template>
    </el-dialog>
</template>

<script>
    export default {
        data () {
            return {
                visible: false,
                document: {}
            }
        },

        methods: {
            load (document) {
                this.visible = true
                this.document = document
            },

            close () {
                this.visible = false
            }
        },

        mounted () {
            this.$root.$on('details::documents', document => this.load(document))
        },

        beforeDestroy () {
            this.$root.$off('details::documents')
        }
    }
</script>