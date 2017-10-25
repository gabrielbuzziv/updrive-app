<template>
    <el-dialog title="Editar documento" :visible.sync="visible" size="tiny">
        <validation-error />

        <v-form method="post" class="horizontal" @submit="onSubmit" ref="form">
            <input type="hidden" name="_method" value="patch">
            <div class="form-group">
                <label class="required">Documento</label>
                <input type="text" name="name" class="form-control field" v-model="document.name" required>
            </div>

            <div class="form-group">
                <label>Competência</label>
                <input type="text" name="cycle" class="form-control field" v-model="document.cycle" v-mask="'##/####'">
                <small class="helper-block offset">
                    Vazio significa sem competência. (mês/ano)
                </small>
            </div>

            <div class="form-group">
                <label>Vencimento</label>
                <input type="text" name="validity" class="form-control field" v-model="document.validity"
                       v-mask="'##/##/####'">
                <small class="helper-block offset">
                    Vazio significa que o documento não tem vencimento e jamais vencerá. (dia/mês/ano)
                </small>
            </div>

            <div class="form-group">
                <label>Observação</label>
                <textarea name="note" class="form-control field" rows="5" v-model="document.note"></textarea>
                <small class="helper-block offset">
                    Qualquer informação extra sobre o documento pode ser inserido aqui.
                </small>
            </div>

            <div class="el-dialog__footer no-padding no-border">
                <div class="text-left">
                    <button class="btn btn-success btn-rounded" @click="onSubmit" :disabled="loading || saving">
                        <span class="loader button inline margin-right-5" v-if="saving"></span>
                        <i class="mdi mdi-check-circle margin-right-5" v-else></i>
                        Salvar
                    </button>

                    <a href="#" class="btn btn-blank" @click.prevent="close">
                        Cancelar
                    </a>
                </div>
            </div>
        </v-form>
    </el-dialog>
</template>

<script type="text/babel">
    import services from '../../services'

    export default {
        data () {
            return {
                document: {},
                visible: false,
                loading: true,
                saving: false,
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

            onSubmit () {
                const form   = this.$refs.form.$el
                const action = `documents/${this.document.id}`

                this.saving = true
                services.saveDocument(action, new FormData(form))
                        .then(response => {
                            this.saving = false
                            this.close()
                            this.$store.dispatch('updrive/FETCH_ALL')
                        })
                        .catch(() => this.saving = false)
            },

            close () {
                this.visible = false
            }
        },

        mounted () {
            this.$root.$on('edit::document', (document) => this.load(document))
        },

        beforeDestroy () {
            this.$root.$off('edit::document')
        }
    }
</script>