<template>
    <page-load>
        <page-form :action="`/companies/${$route.params.id}`" method="patch">
            <page-header title="Empresas" children="Editar" href="companies.list">
                <template slot="right">
                    <button class="btn btn-secondary btn-rounded" type="submit" :disabled="saving">
                        <div class="loader button inline light margin-right-5" v-if="saving"></div>
                        <i class="mdi mdi-check-circle margin-right-5" v-else></i>
                        Salvar
                    </button>
                </template>

                <template slot="nav">
                    <tab-link tab="general" active>
                        <i class="mdi mdi-apps margin-right-10"></i>Geral
                    </tab-link>
                    <tab-link tab="address">
                        <i class="mdi mdi-map-marker margin-right-10"></i>Endereço
                    </tab-link>
                </template>
            </page-header>

            <page-content>
                <validation-error />

                <form-fields :data="company" />
            </page-content>
        </page-form>
    </page-load>
</template>

<script type="text/babel">
    import PageForm from './Form'
    import FormFields from './FormFields'
    import services from '../services'

    export default {
        components: { PageForm, FormFields },

        data () {
            return {
                company: {
                    name: '',
                    nickname: '',
                    phone: '',
                    taxvat: '',
                    address: {
                        postcode: '',
                        street: '',
                        district: '',
                        number: '',
                        city: '',
                        state: ''
                    },
                    identifier: ''
                }
            }
        },

        computed: {
            saving () {
                return this.$store.getters['global/GET_SUBMITING']
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