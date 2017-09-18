<template>
    <page-load :header="! success" title="Esqueceu sua senha?">
        <form action="" @submit.prevent="onSubmit" ref="form" v-if="! success">
            <div class="form-group" :class="{ 'has-error': errors.has('email') }">
                <div class="input-group">
                    <div class="input-group-addon">
                        <i class="mdi mdi-account"></i>
                    </div>

                    <input type="text" name="email" class="form-control"
                           placeholder="Digite seu e-mail de login" v-model="email"
                           v-validate="'required|email'" v-focus>
                </div>

                <small class="helper-block error" v-if="errors.has('email')">{{ errors.first('email') }}</small>
            </div>

            <div class="form-group">
                <button class="btn btn-success btn-quirk btn-block" type="submit" :disabled="submitting">
                    <span v-if="submitting">
                        <span class="loader spinner small margin-right-5"></span>
                        Enviando solicitação
                    </span>

                    <span v-else>Solicitar senha</span>
                </button>
            </div>
        </form>

        <div class="success-password" v-else>
            <i class="mdi mdi-check-circle"></i>

            <h3>Confirmação enviada</h3>
            <p>
                Um e-mail com link de confirmação foi enviado,
                acesse o link do e-mail para realizar a troca da senha.
            </p>
        </div>

        <router-link :to="{ name: 'auth.login' }" class="link margin-top-30">
            Voltar para o login
        </router-link>
    </page-load>
</template>

<script type="text/babel">
    import services from '../services'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                success: false,
                submitting: false,
                loaded: false
            }
        },

        methods: {
            onSubmit () {
                const vm = this
                const form = vm.$refs.form

                vm.$validator.validateAll()
                        .then(success => {
                            if (! success) return

                            vm.submitting = true
                            services.requestNewPassword(new FormData(form))
                                    .then(response => {
                                        vm.email = ''
                                        vm.submitting = false
                                        vm.success = true
                                    })
                                    .catch(() => vm.submitting = false)
                        })
            }
        },

        mounted () {
            this.loaded = true
        }
    }
</script>