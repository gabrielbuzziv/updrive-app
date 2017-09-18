<template>
    <page-load class="inner">
        <page-header title="Empresas" :children="company.name" href="companies.list">
            <template slot="right">
                <route href="companies.edit" :params="{ id: company.id }" class="btn btn-secondary btn-rounded">
                    <i class="mdi mdi-pencil-circle margin-right-5"></i>
                    Editar
                </route>
            </template>

            <template slot="nav">
                <route href="companies.details" :params="{ id: company.id }" tag="li" exact>
                    <a>
                        <i class="mdi mdi-apps margin-right-10"></i>Geral
                    </a>
                </route>

                <route href="companies.details.contacts" :params="{ id: company.id }" tag="li">
                    <a>
                        <i class="mdi mdi-account-multiple margin-right-10"></i>Contatos
                    </a>
                </route>
            </template>
        </page-header>

        <page-content>
            <router-view></router-view>
        </page-content>
    </page-load>
</template>

<script type="text/babel">
    import services from '../../services'

    export default {
        data () {
            return {
                company: {
                    id: 0,
                    address: {},
                    contacts: [],
                    folders: []
                }
            }
        },


        mounted () {
            services.find(this.$route.params.id)
                    .then(response => {
                        this.company = response.data
                    })
        }
    }
</script>