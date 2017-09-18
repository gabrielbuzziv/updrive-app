<template>
    <page-load :loading="loading">
        <!-- Show contacts if has. -->
        <div v-if="contacts.length || filtered">
            <div id="options-list">
                <div class="row">
                    <div class="col-md-8 col-sm-6">
                        <div class="search">
                            <i class="mdi mdi-magnify"></i>
                            <input type="text"
                                   class="form-control"
                                   placeholder="Buscar"
                                   v-model="search"
                                   @keydown="searchContact"
                                   v-focus>
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-6">
                        <button class="btn btn-primary btn-rounded pull-right margin-right-10 margin-top-10" @click.prenvet="newContact">
                            <i class="mdi mdi-plus-circle margin-right-5"></i>
                            Adicionar Contato
                        </button>
                    </div>

                    <div class="clearfix"></div>
                </div>
            </div>

            <panel>
                <div class="table-responsive">
                    <table class="table table-contacts">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="contact in contacts">
                                <td>
                                    <span class="name">
                                        <route href="contacts.details" :params="{ id: contact.id }">{{ contact.name }}</route>
                                    </span>
                                    <span class="email">{{ contact.email }}</span>
                                </td>
                                <td class="text-right" width="60">
                                    <button class="btn btn-default btn-sm btn-rounded" @click.prevent="revoke(contact)">
                                        <i class="mdi mdi-close-circle margin-right-5"></i>
                                        Revogar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </panel>
        </div>

        <div v-else>
            <first-time title="Contatos" icon="account-multiple" message="Ops, a empresa ainda não tem contatos cadastrados.">
                <template slot="buttons">
                    <button class="btn btn-primary margin-top-20" @click.prenvet="newContact">
                        <i class="mdi mdi-plus-circle margin-right-5"></i>
                        Adicionar Contato
                    </button>
                </template>
            </first-time>

        </div>

        <new-contact />
    </page-load>
</template>

<script type="text/babel">
    import NewContact from './NewContact'
    import services from '../../services'
    import { debounce } from 'lodash'

    export default {
        components: { NewContact },

        data () {
            return {
                loading: true,
                search: '',
                filtered: false
            }
        },

        computed: {
            contacts () {
                return this.$store.getters['companies/GET_CONTACTS']
            }
        },

        methods: {
            searchContact: debounce (function () {
                const query = this.search
                this.filtered = true
                this.$store.dispatch('companies/FETCH_CONTACTS', { company: this.$route.params.id, query })
            }, 300),

            newContact () {
                this.$root.$emit('new::contact')
            },

            revoke (contact) {
                this.$confirm('Você tem certeza que deseja revogar este contato da empresa?', 'Tem certeza?', {
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning'
                }).then(() => {
                    const company = this.$route.params.id
                    services.revokeContact(company, contact.id)
                            .then(response => {
                                this.$store.dispatch('companies/FETCH_CONTACTS', { company: this.$route.params.id })
                            })
                })
            }
        },

        mounted () {
            this.$store.dispatch('companies/FETCH_CONTACTS', { company: this.$route.params.id })
                    .then(() => this.loading = false)
                    .catch(() => this.loading = false)
        }
    }
</script>
