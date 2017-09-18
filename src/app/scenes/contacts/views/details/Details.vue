<template>
    <page-load class="inner">
        <page-header title="Contatos" :children="contact.name" href="contacts.list">
            <template slot="right">
                <route href="contacts.edit" :params="{ id: contact.id }" class="btn btn-secondary btn-rounded">
                    <i class="mdi mdi-pencil-circle margin-right-5"></i>
                    Editar
                </route>
            </template>

            <template slot="nav">
                <route href="contacts.details" :params="{ id: contact.id }" tag="li" exact>
                    <a>
                        <i class="mdi mdi-apps margin-right-10"></i>Geral
                    </a>
                </route>

                <route href="contacts.details.companies" :params="{ id: contact.id }" tag="li">
                    <a>
                        <i class="mdi mdi-briefcase margin-right-10"></i>Empresas
                    </a>
                </route>

                <div class="clearfix"></div>
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
                contact: {
                    id: 0,
                    address: {},
                    companies: []
                }
            }
        },


        mounted () {
            services.find(this.$route.params.id)
                    .then(response => {
                        this.contact = response.data
                    })
        }
    }
</script>