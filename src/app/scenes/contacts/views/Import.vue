<template>
    <el-dialog title="Importar empresas" :visible.sync="visible">
        <div class="alert alert-info">
            <h3>Importar seus contatos para o UP Drive</h3>

            <p>
                Baixe nossa planilha padrão, preencha os dados dos contatos e envie para nós.
            </p>
        </div>

        <v-form action="" ref="form" @submit="onSubmit">
            <div class="text-center block margin-top-30 margin-bottom-30">
                <a :href="downloadImportSheet" class="btn btn-rounded">
                    <i class="mdi mdi-arrow-down-bold-circle margin-right-5"></i>
                    Baixar planilha padrão
                </a>

                <i class="mdi mdi-arrow-right"></i>

                <label class="upload-button">
                    <input type="file" @change="addFile">
                    <span class="btn btn-primary btn-rounded" :class="{ 'btn-secondary': valid }">
                        <i class="mdi mdi-arrow-up-bold-circle margin-right-5"></i>
                        <span v-if="valid">
                            {{ file.name }}
                        </span>
                        <span v-else>Enviar planilha de contatos</span>
                    </span>
                </label>
            </div>
            <div class="el-dialog__footer no-padding no-border">
                <div class="text-left">
                    <button class="btn btn-success btn-rounded" type="submit" :disabled="importing || ! valid">
                        <span class="loader button inline light margin-right-5" v-if="importing"></span>
                        <i class="mdi mdi-check-circle margin-right-5" v-else></i>
                        Importar
                    </button>

                    <button class="btn btn-blank" @click.prevent="close">
                        Cancelar
                    </button>
                </div>
            </div>
        </v-form>
    </el-dialog>
</template>

<script type="text/babel">
    import services from '../services'
    import Helper from 'common/Helper'

    export default {
        data () {
            return {
                visible: false,
                file: null,
                importing: false
            }
        },

        computed: {
            token () {
                return localStorage.getItem('auth_token')
            },

            downloadImportSheet () {
                return `${window.env.API_URL}/contacts/import/download/?token=${this.token}`
            },

            valid () {
                return this.file != null
            }
        },

        methods: {
            load () {
                this.file = null
                this.visible = true
            },

            onSubmit () {
                const data = new FormData()
                data.append('import', this.file)

                this.importing = true
                services.import(data)
                        .then(response => {
                            const amount = response.data.length
                            this.$message.success(`Foram importadas ${amount} contatos.`)
                            this.importing = false
                            this.$store.dispatch('contacts/FETCH_ALL')
                            this.close()
                        })
                        .catch(() => {
                            this.$message.error(`Ops, parece que o arquivo de importação não é válido.`)
                            this.importing = false
                        })
            },

            addFile (e) {
                const file = e.target.files[0]

                if (Helper.getFilename(file.name).extension != 'csv') {
                    this.$message.error('O arquivo de importação deve ser .csv')
                    this.file = null
                    e.target.value = null

                    return false
                }

                this.file = file
                e.target.value = null
            },

            close () {
                this.visible = false
            }
        },

        mounted () {
            this.$root.$on('import::contacts', () => this.load())
        },

        beforeDestroy () {
            this.$root.$off('import::contacts')
        }
    }
</script>
