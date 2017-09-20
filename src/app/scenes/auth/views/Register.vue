<template>
    <page-load>
        <panel>
            <div class="header">
                <h1>Preencha seus Dados</h1>
            </div>

            <validation-error />

            <v-form action="" @submit="onSubmit" ref="form">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="mdi mdi-account"></i>
                        </div>
                        <input type="text" name="name" v-model="form.name" class="form-control" placeholder="Nome" required>
                    </div>
                </div>

                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="mdi mdi-key"></i>
                        </div>
                        <input type="password" name="password" v-model="form.password" class="form-control" placeholder="Senha" required>
                    </div>
                </div>

                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="mdi mdi-key"></i>
                        </div>
                        <input type="password" name="password_confirmation" v-model="form.password_confirmation" class="form-control" placeholder="Confirmar Senha" required>
                    </div>
                </div>

                <div class="text">
                    <button class="btn btn-secondary btn-rounded" :disabled="submiting" type="submit">
                        <span class="loader button inline light margin-right-5" v-if="submiting"></span>
                        <i class="mdi mdi-check-circle margin-right-5" v-else></i>
                        Registrar
                    </button>

                    <route href="auth.login" class="btn btn-blank">
                        Já tenho conta, quero conectar.
                    </route>
                </div>
            </v-form>
        </panel>
    </page-load>
</template>

<script type="text/babel">
    import services from '../services'

    export default {
        data () {
            return {
                form: {
                    name: '',
                    password: '',
                    password_confirmation: ''
                },
                user: {},
                submiting: false
            }
        },

        methods: {
            onSubmit () {
                const form = this.$refs.form.$el

                this.submiting = true
                services.registerCollaborator(this.user.id, new FormData(form))
                        .then(response => {
                            this.validated()
                            const user = { email: response.data.email, password: this.form.password }
                            this.$store.dispatch('auth/ON_LOGIN', { ...user })
                                    .then(() => {
                                        this.$store.dispatch('auth/FETCH_USER')
                                                .then(response => {
                                                    this.$router.push('/')
                                                })
                                                .catch(() => this.submitting = false)
                                    })
                                    .catch(error => this.submitting = false)
                        })
                        .catch(() => this.submiting = false)
            }
        },

        mounted () {
            const email = this.$route.query.email
            const token = this.$route.query.token

            services.validateInvite(email, token)
                    .then(response => this.user = response.data)
                    .catch(() => this.$router.push('/login'))
        }
    }
</script>