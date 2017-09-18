<template>
    <page-load>
           <panel>
               <div class="header">
                   <h1>UP Drive</h1>
               </div>

               <validation-error />

               <v-form action="" @submit="authenticate">
                   <div class="form-group">
                       <div class="input-group">
                           <div class="input-group-addon">
                               <i class="mdi mdi-account"></i>
                           </div>

                           <input type="text" name="email" class="form-control" placeholder="E-mail"
                                  v-model="user.email" required>
                       </div>
                   </div>

                   <div class="form-group">
                       <div class="input-group">
                           <div class="input-group-addon">
                               <i class="mdi mdi-lock"></i>
                           </div>

                           <input type="password" name="password" class="form-control" placeholder="Senha"
                                  v-model="user.password" required>
                       </div>
                   </div>

                   <div class="text-left">
                       <button class="btn btn-secondary btn-rounded" :disabled="submitting" type="submit">
                           <span class="loader button inline light margin-right-5" v-if="submitting"></span>
                           <i class="mdi mdi-check-circle margin-right-5" v-else></i>
                           Entrar
                       </button>

                       <!--<route href="auth.password.forgot" class="btn btn-blank">-->
                           <!--Esqueci minha senha-->
                       <!--</route>-->
                   </div>
               </v-form>
           </panel>
    </page-load>
</template>

<script type="text/babel">
    export default {
        data () {
            return {
                submitting: false,
                user: {
                    email: '',
                    password: ''
                }
            }
        },

        computed: {
            isLogged () {
                return this.$store.getters['auth/IS_LOGGED']
            },

            redirectTo () {
                return this.$route.query.redirect_to ? this.$route.query.redirect_to : '/'
            }
        },

        methods: {
            authenticate () {
                const user = this.user

                this.submitting = true
                this.$store.dispatch('auth/ON_LOGIN', { ...user })
                        .then(() => {
                            this.$store.dispatch('auth/FETCH_USER')
                                    .then(response => {
                                        this.$router.push(this.redirectTo)
                                    })
                                    .catch(() => this.submitting = false)
                        })
                        .catch(error => {
                            this.$store.dispatch('global/SET_VALIDATION_ERROR', [['Login ou Senha inválidos.']])
                            this.submitting = false
                        })
            }
        },

        mounted () {
            if (this.$route.query.token) {
                localStorage.setItem('auth_token', this.$route.query.token)
                this.$router.push(this.redirectTo)
            } else {
                const user = this.$store.getters['auth/GET_USER']

                if (user.id) {
                    this.$router.push(this.redirectTo)
                }
            }
        }
    }
</script>