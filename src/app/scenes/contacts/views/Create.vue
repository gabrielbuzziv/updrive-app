<template>
    <page-load>
        <page-form action="/contacts" method="post">
            <page-header title="Contatos" children="Adicionar Novo" href="contacts.list">
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
                    <tab-link tab="phones">
                        <i class="mdi mdi-phone-classic margin-right-10"></i>Telefones
                    </tab-link>
                    <tab-link tab="address">
                        <i class="mdi mdi-map-marker margin-right-10"></i>Endereço
                    </tab-link>
                </template>
            </page-header>

            <page-content>
                <validation-error />

                <form-fields :data="contact" />
            </page-content>
        </page-form>
    </page-load>
</template>

<script type="text/babel">
    import PageForm from './Form'
    import FormFields from './FormFields'

    export default {
        components: { PageForm, FormFields },

        data () {
            return {
                contact: {
                    companies: [],
                    phones: [{ number: '', type: 0 }],
                    address: {
                        postcode: '',
                        street: '',
                        district: '',
                        number: '',
                        city: '',
                        state: ''
                    }
                }
            }
        },

        computed: {
            saving () {
                return this.$store.getters['global/GET_SUBMITING']
            }
        }
    }
</script>