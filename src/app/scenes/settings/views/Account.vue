<template>
    <page-load :loading="loading">
        <div class="alert alert-info">
            Os detalhes da conta, são referente aos dados da sua empresa, as informações aqui serão
            utilizadas para entrar em contato e cobrança.
        </div>

        <panel>
            <v-form action="" method="POST" @submit="onSubmit" ref="form">
                <div class="row">
                    <div class="form-group col-md-3">
                        <label>Nome da Empresa</label>
                        <input type="text" class="form-control" name="name" v-model="account.name">
                    </div>

                    <div class="form-group col-md-3">
                        <label>E-mail</label>
                        <input type="text" class="form-control" name="email" v-model="account.email">
                    </div>
                </div>

                <button class="btn btn-secondary btn-rounded margin-top-10">
                    <i class="mdi mdi-pencil circle margin-right-5"></i>
                    Alterar dados
                </button>
            </v-form>
        </panel>
    </page-load>
</template>

<script type="text/babel">
    import services from '../services'

    export default {
        data () {
            return {
                account: {
                    address: {}
                },
                loading: true
            }
        },

        methods: {
            onSubmit () {
                const form = this.$refs.form.$el
            }
        },

        mounted () {
            services.getAccount()
                    .then(response => {
                        this.account = response.data
                        this.loading = false
                    })
                    .catch(() => this.loading = false)
        }
    }
</script>