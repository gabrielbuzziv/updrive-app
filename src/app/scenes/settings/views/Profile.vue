<template>
    <page-load id="settings">
        <validation-error/>

        <div class="col-md-8 col-md-offset-2">
            <h2 class="section-title">Suas informações</h2>

            <panel class="margin-bottom-50">
                <v-form action="" method="POST" @submit="updateDetails">
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label>Nome</label>
                            <input type="text" class="form-control" name="name" v-model="user.name" v-focus>
                        </div>

                        <div class="form-group col-md-6">
                            <label class="required">E-mail</label>
                            <input type="text" class="form-control" name="email" v-model="user.email" required
                                   readonly>
                        </div>
                    </div>

                    <button class="btn btn-secondary btn-rounded margin-top-10" :disabled="updatingDetails">
                        <span class="loader button inline light margin-right-5" v-if="updatingDetails"></span>
                        <i class="mdi mdi-pencil-circle margin-right-5" v-else></i>
                        Alterar dados
                    </button>
                </v-form>
            </panel>

            <h2 class="section-title">Atualize sua senha</h2>

            <panel class="margin-bottom-50">
                <v-form action="" method="POST" @submit="updatePassword" ref="password">
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="required">Nova senha</label>
                            <input type="password" class="form-control" name="password" required>
                        </div>

                        <div class="form-group col-md-6">
                            <label class="required">Confirmar nova senha</label>
                            <input type="password" class="form-control" name="password_confirmation" required>
                        </div>
                    </div>

                    <button class="btn btn-secondary btn-rounded margin-top-10" :disabled="updatingPassword">
                        <span class="loader button inline light margin-right-5" v-if="updatingPassword"></span>
                        <i class="mdi mdi-pencil-circle margin-right-5" v-else></i>
                        Atualizar senha
                    </button>
                </v-form>
            </panel>

            <h2 class="section-title">Atualize seu avatar</h2>

            <panel>
                <div class="text-center">
                    <div class="inline vertical-middle margin-right-10 text-left">
                        <img :src="user.links.gravatar" class="text-left img-circle img-responsive">
                    </div>

                    <div class="inline vertical-middle text-left">
                        <label>Foto de perfil</label>
                        <p>
                            Você pode alterar sua foto de perfil através do
                            <a href="https://pt.gravatar.com/" target="_blank">Gravatar</a>
                        </p>
                    </div>
                </div>
            </panel>
        </div>
    </page-load>
</template>

<script type="text/babel">
    import services from '../services'

    export default {
        data () {
            return {
                user: {
                    links: {}
                },
                updatingDetails: false,
                updatingPassword: false
            }
        },

        methods: {
            updateDetails () {
                this.updatingDetails = true
                const data = { name: this.user.name }

                services.updateDetails(data)
                    .then(() => {
                        this.$message.success('Seus dados foram alterados com sucesso.')
                        this.$store.dispatch('auth/FETCH_USER')
                        this.updatingDetails = false
                    })
                    .catch(() => this.updatingDetails = false)
            },

            updatePassword () {
                const form = this.$refs.password.$el

                this.updatingPassword = true
                services.updatePassword(new FormData(form))
                    .then(() => {
                        this.$message.success('Sua senha foi atualizada com sucesso.')
                        this.updatingPassword = false
                        this.validated()
                        form.reset()
                    })
                    .catch(() => this.updatingPassword = false)
            }
        },

        mounted () {
            this.user = this.$store.getters['auth/GET_USER']
        }
    }
</script>