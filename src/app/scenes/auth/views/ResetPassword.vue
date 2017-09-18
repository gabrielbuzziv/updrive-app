<template>
    <page-load title="Escolher nova senha">
        <form action="" @submit.prevent="onSubmit" ref="form">
            <input type="hidden" name="token" :value="$route.query.token">

            <div class="form-group" :class="{ 'has-error': errors.has('email') }">
                <div class="input-group">
                    <div class="input-group-addon">
                        <i class="mdi mdi-account"></i>
                    </div>

                    <input type="text" name="email" class="form-control" placeholder="E-mail"
                           v-model="email" v-validate="'required|email'" readonly>
                </div>

                <span class="helper-block error" v-if="errors.has('email')">{{ errors.first('email')
                    }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': errors.has('password') }">
                <div class="input-group">
                    <div class="input-group-addon">
                        <i class="mdi mdi-account"></i>
                    </div>

                    <input type="password" name="password" class="form-control" placeholder="Nova senha"
                           v-model="password" v-validate="'required|min:6'">
                </div>

                <span class="helper-block error" v-if="errors.has('password')">{{
                    errors.first('password') }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': errors.has('password_confirmation') }">
                <div class="input-group">
                    <div class="input-group-addon">
                        <i class="mdi mdi-account"></i>
                    </div>

                    <input type="password" name="password_confirmation" class="form-control"
                           placeholder="Confirmar nova senha"
                           v-model="password_confirmation"
                           v-validate="'required|min:6|confirmed:password'">
                </div>

                <span class="helper-block error" v-if="errors.has('password_confirmation')">
                    {{ errors.first('password_confirmation') }}
                </span>
            </div>

            <div class="form-group">
                <button class="btn btn-success btn-quirk btn-block" type="submit" :disabled="saving">
                    <span v-if="saving">
                        <span class="loader spinner small margin-right-5"></span>
                        Salvando...
                    </span>

                    <span v-else>Salvar</span>
                </button>
            </div>

            <router-link :to="{ name: 'auth.login' }" class="link">
                Voltar para o login
            </router-link>
        </form>
    </page-load>
</template>

<script type="text/babel">
    import services from '../services'

    export default {
        data () {
            return {
                saving: false,
                password: '',
                password_confirmation: ''
            }
        },

        computed: {
            email () {
                const vm = this

                if (vm.$route.query && vm.$route.query.email) {
                    return vm.$route.query.email
                }

                return ''
            }
        },

        methods: {
            onSubmit () {
                const vm = this
                const form = vm.$refs.form

                vm.$validator.validateAll()
                        .then(success => {
                            if (! success) return

                            vm.saving = true
                            services.resetPassword(new FormData(form))
                                    .then(response => {
                                        vm.onSuccess(response.data)
                                        vm.saving = false
                                        vm.$router.push({ name: 'auth.login' })
                                    })
                                    .catch(() => vm.saving = false)
                        })
            }
        }
    }
</script>