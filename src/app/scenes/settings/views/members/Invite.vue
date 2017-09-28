<template>
    <el-dialog title="Convidar Membros" :visible.sync="visible" size="tiny">
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
                    Os membros recerão um e-mail de convite para se registrarem na ferramenta.
                </small>
            </div>

            <div class="el-dialog__footer no-padding no-border">
                <div class="text-left">
                    <button class="btn btn-success btn-rounded" :disabled="! isValid || submiting">
                        <span class="loader inline button light margin-right-5" v-if="submiting"></span>
                        <i class="mdi mdi-plus margin-right-5" v-else></i>
                        Convidar
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
                services.inviteMembers(data)
                        .then(() => {
                            this.$message.success('Foi enviado um convite para cada um dos membros convidados.')
                            this.validated()
                            this.close()
                            this.$store.dispatch('settings/FETCH_MEMBERS')
                            this.submiting = false
                        })
                        .catch(() => this.submiting = false)
            },

            close () {
                this.visible = false
            }
        },

        mounted () {
            this.$root.$on('invite::members', () => this.load())
        },

        beforeDestroy () {
            this.$root.$off('invite::members')
        }
    }
</script>