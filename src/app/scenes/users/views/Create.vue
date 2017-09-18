<template>
    <el-dialog title="Adicionar Colaborador" :visible.sync="visible" size="tiny">
        <validation-error/>

        <v-form @submit="onSubmit" ref="form">
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon">
                        <i class="mdi mdi-email"></i>
                    </div>
                    <input type="text" v-model="emails" class="form-control" required
                           placeholder="Convidar por endereço de e-mail, separado por vírgula.">
                </div>

                <small class="helper-block">
                    Os colaboradores recerão um e-mail de convite para se cadastrarem no sistema.
                </small>
            </div>

            <div class="el-dialog__footer no-padding no-border">
                <div class="text-left">
                    <button class="btn btn-success btn-rounded" :disabled="! isValid || submiting">
                        <span class="loader inline button light margin-right-5" v-if="submiting"></span>
                        <i class="mdi mdi-plus margin-right-5" v-else></i>
                        Adicionar
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

    export default {
        data () {
            return {
                emails: '',
                submiting: false,
                visible: false
            }
        },

        computed: {
            isValid () {
                return this.emails != '' && this.emails != null
            }
        },

        methods: {
            load () {
                this.$store.commit('global/VALIDATION_ERROR', [])
                this.visible = true
                this.emails  = ''
            },

            onSubmit () {
                const emails = this.emails.split(',')
                const data = new FormData()
                emails.forEach(email => data.append('email[]', email.trim()))

                this.submiting = true
                services.addUsers(data)
                        .then(() => {
                            this.$message.success('O convite foi enviado para o(s) colaborador(es) convidados.')
                            this.validated()
                            this.close()
                            this.$store.dispatch('users/FETCH_ALL')
                            this.submiting = false
                        })
                        .catch(() => this.submiting = false)
            },

            close () {
                this.visible = false
            }
        },

        mounted () {
            this.$root.$on('create::user', () => this.load())
        },

        beforeDestroy () {
            this.$root.$off('create::user')
        }
    }
</script>