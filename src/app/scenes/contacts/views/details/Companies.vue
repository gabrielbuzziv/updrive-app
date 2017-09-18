<template>
    <page-load :loading="loading">
        <!-- Show companies if has. -->
        <div v-if="companies.length">
            <panel>
                <div class="table-responsive">
                    <table class="table table-companies">
                        <thead>
                            <tr>
                                <th>Razão Social / Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="company in companies">
                                <td>
                                    <route href="companies.details" :params="{ id: company.id }">{{ company.name }}</route>
                                </td>
                                <td>{{ company.email }}</td>
                                <td>{{ company.phone }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </panel>
        </div>

        <div v-else>
            <first-time title="Empresas" icon="domain" message="Ops, o contato ainda não pertence a nenhuma empresa." />
        </div>
    </page-load>
</template>

<script type="text/babel">
    import services from '../../services'

    export default {

        data () {
            return {
                loading: true,
                companies: [],
            }
        },

        mounted () {
            return services.getCompanies(this.$route.params.id)
                    .then(response => {
                        this.companies = response.data.items
                        this.loading = false
                    })
                    .catch(() => {
                        this.loading = false
                    })
        },
    }
</script>
