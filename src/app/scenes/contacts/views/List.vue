<template>
    <page-load>
        <page-header title="Contatos" v-if="total">
            <template slot="left">
                <button class="btn btn-rounded margin-right-5 hidden-xs hidden-sm" @click.prevent="$root.$emit('import::contacts')">
                    <i class="mdi mdi-arrow-up-bold-circle margin-right-5"></i>
                    Importar
                </button>
            </template>

            <template slot="right">
                <button class="btn btn-default btn-rounded margin-right-10" @click.prevent="onRemove">
                    <i class="mdi mdi-delete-circle margin-right-5"></i>
                    Excluir
                </button>

                <router-link :to="{ name: 'contacts.create' }" class="btn btn-secondary btn-rounded">
                    <i class="mdi mdi-plus-circle margin-right-5"></i>
                    Adicionar contato
                </router-link>
            </template>
        </page-header>

        <page-content>
            <page-load :loading="loading" v-if="total">
                <options-list namespace="contacts"/>

                <panel>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th width="50">
                                        <el-checkbox v-model="selectAll"/>
                                    </th>
                                    <th>Nome</th>
                                    <th>E-mail</th>
                                    <th width="80"></th>
                                </tr>
                            </thead>

                            <tbody v-if="contacts.length">
                                <tr v-for="contact in contacts">
                                    <td>
                                        <el-checkbox v-model="selected" :label="contact.id">&nbsp;</el-checkbox>
                                    </td>
                                    <td>
                                        <route href="contacts.details" :params="{ id: contact.id }">
                                            {{ contact.name }}
                                        </route>
                                    </td>
                                    <td>{{ contact.email }}</td>
                                    <td class="text-right">
                                        <div class="btn-group">
                                            <route href="contacts.details" :params="{ id: contact.id }" class="btn btn-default btn-sm">
                                                <i class="mdi mdi-eye"></i>
                                            </route>

                                            <route href="contacts.edit" :params="{ id: contact.id }" class="btn btn-default btn-sm">
                                                <i class="mdi mdi-pencil"></i>
                                            </route>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                            <tbody v-else>
                                <tr>
                                    <td colspan="4">
                                        Nenhum contato encontrado.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </panel>
            </page-load>

            <page-load v-if="! total && ! loading">
                <first-time title="Contatos" icon="account-multiple"
                            :advantages="['Acesse facilmente os dados dos seus contatos', 'Saiba quem está abrindo os documentos']">
                    <template slot="buttons">
                        <route href="contacts.create" class="btn btn-secondary btn-rounded margin-right-5">
                            <i class="mdi mdi-plus-circle margin-right-5"></i>
                            Adicionar contato
                        </route>

                        <button class="btn btn-primary btn-rounded margin-left-10">
                            <i class="mdi mdi-import margin-right-5"></i>
                            Importar contatos
                        </button>
                    </template>
                </first-time>
            </page-load>
        </page-content>

        <import-contacts />
    </page-load>
</template>

<script type="text/babel">
    import ImportContacts from './Import'
    import services from '../services'

    export default {
        components: { ImportContacts },

        data () {
            return {
                total: 0,
                selected: [],
                loading: true
            }
        },

        computed: {
            contacts () {
                return this.$store.getters['contacts/GET_ALL']
            },

            selectAll: {
                get () {
                    return this.contacts ? this.selected.length == this.contacts.length : false
                },

                set (select) {
                    this.selected = ! select ? [] : this.contacts.map(contact => contact.id)
                }
            }
        },

        methods: {
            onRemove () {
                if (! this.selected.length) {
                    this.$message.info('Você precisa selecionar os contatos que deseja excluir.')
                    return false
                }

                this.$confirm('Você tem certeza que deseja excluir as contatos selecionadas?', 'Excluir contatos', {
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    type: 'error'
                }).then(() => {
                    services.delete(this.selected)
                            .then(() => {
                                this.$message.success('Os contatos selecionados foram removidos.')
                                this.$store.dispatch('contacts/FETCH_ALL')
                                this.selected = []
                            })
                            .catch(() => {
                                this.$message.error('Não foi possível remover as colaboradores selecionadas.')
                            })
                })
            }
        },

        mounted () {
            services.getTotal()
                    .then(response => {
                        this.total = response.data.total

                        if (this.total) {
                            this.$store.dispatch('contacts/FETCH_ALL')
                                    .then(() => this.loading = false)
                                    .catch(() => this.loading = false)
                        } else {
                            this.loading = false
                        }
                    })
                    .catch(() => this.loading = false)
        },
    }
</script>