<template>
    <el-dialog title="Status do Documento" :visible.sync="visible">
        <table class="table">
            <thead>
                <tr>
                    <th>Quem?</th>
                    <th>O que?</th>
                    <th class="text-right">Quando?</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="status in document.history">
                    <td>{{ getStatusUser(status) }}</td>
                    <td>{{ getStatusLabel(status) }}</td>
                    <td class="text-right">{{ status.created_at }}</td>
                </tr>
            </tbody>
        </table>
    </el-dialog>
</template>

<script type="text/babel">
    import services from '../../services'

    export default {
        data () {
            return {
                document: {},
                visible: false,
                loading: true
            }
        },

        methods: {
            load (document) {
                this.document = {}
                this.visible  = true

                services.getDocument(document)
                        .then(response => {
                            this.document = response.data
                            this.loading  = false
                        })
                        .catch(() => this.loading = false)
            },

            getStatusUser (status) {
                return status.user ? status.user.name : 'Sistema'
            },

            getStatusLabel (status) {
                const action = status.action

                const text = [null, 'Carregou', 'Visualizou', 'Baixou', null, 'Venceu']
                return text[action]
            },

            close () {
                this.visible = false
            }
        },

        mounted () {
            this.$root.$on('status::document', (document) => this.load(document))
        },

        beforeDestroy () {
            this.$root.$off('status::document')
        }
    }
</script>