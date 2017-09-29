<template>
    <page-load>
        <page-header title="Empresas" v-if="total">
            <template slot="left">
                <button class="btn btn-rounded margin-right-5 hidden-xs hidden-sm" @click.prevent="$root.$emit('import::companies')">
                    <i class="mdi mdi-arrow-up-bold-circle margin-right-5"></i>
                    Importar
                </button>
            </template>

            <template slot="right">
                <button class="btn btn-rounded margin-right-5" @click.prevent="onRemove">
                    <i class="mdi mdi-delete-circle margin-right-5"></i>
                    Excluir
                </button>

                <route href="companies.create" class="btn btn-secondary btn-rounded">
                    <i class="mdi mdi-plus-circle margin-right-5"></i>
                    Adicionar empresa
                </route>
            </template>
        </page-header>

        <page-content>
            <page-load :loading="loading" v-if="total">
                <options-list namespace="companies"/>

                <panel>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th width="50">
                                        <el-checkbox v-model="selectAll"/>
                                    </th>
                                    <th class="hidden-sm hidden-xs"></th>
                                    <th>Razão Social</th>
                                    <th class="hidden-sm hidden-xs">E-mail</th>
                                    <th class="hidden-sm hidden-xs">Telefone</th>
                                    <th width="80"></th>
                                </tr>
                            </thead>

                            <tbody v-if="companies.length">
                                <tr v-for="company in companies">
                                    <td>
                                        <el-checkbox v-model="selected" :label="company.id">&nbsp;</el-checkbox>
                                    </td>
                                    <td class="hidden-sm hidden-xs">
                                        <span v-if="company.identifier">
                                            {{ company.identifier }}
                                        </span>
                                    </td>
                                    <td>
                                        <route href="companies.details" :params="{ id: company.id }">
                                            {{ company.name }}
                                        </route>
                                    </td>
                                    <td class="hidden-sm hidden-xs">{{ company.email }}</td>
                                    <td class="hidden-sm hidden-xs">{{ company.phone }}</td>
                                    <td class="text-right">
                                        <div class="btn-group">
                                            <route href="companies.details" :params="{ id: company.id }" class="btn btn-default btn-sm">
                                                <i class="mdi mdi-eye"></i>
                                            </route>

                                            <route href="companies.edit" :params="{ id: company.id }" class="btn btn-default btn-sm">
                                                <i class="mdi mdi-pencil"></i>
                                            </route>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                            <tbody v-else>
                                <tr>
                                    <td colspan="4">
                                        Nenhuma empresa encontrada.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </panel>
            </page-load>

            <page-load v-if="! total && ! loading">
                <first-time title="Empresas" icon="domain"
                            :advantages="['Acesse facilmente os dados de seus clientes', 'Saiba como está a entrega de documentação de cada empresa']">

                    <template slot="buttons">
                        <route href="companies.create" class="btn btn-secondary btn-rounded margin-right-5">
                            <i class="mdi mdi-plus-circle margin-right-5"></i>
                            Adicionar empresa
                        </route>

                        <button class="btn btn-primary btn-rounded margin-left-10" @click.prevent="$root.$emit('import::companies')">
                            <i class="mdi mdi-import margin-right-5"></i>
                            Importar empresas
                        </button>
                    </template>
                </first-time>
            </page-load>
        </page-content>

        <import-companies />
    </page-load>
</template>

<script type="text/babel">
    import ImportCompanies from './Import'
    import services from '../services'

    export default {
        components: { ImportCompanies },

        data () {
            return {
                total: 0,
                selected: [],
                loading: true
            }
        },

        computed: {
            companies () {
                return this.$store.getters['companies/GET_ALL']
            },

            selectAll: {
                get () {
                    return this.companies ? this.selected.length == this.companies.length : false
                },

                set (select) {
                    this.selected = ! select ? [] : this.companies.map(company => company.id)
                }
            }
        },

        methods: {
            onRemove () {
                if (! this.selected.length) {
                    this.$message.info('Você precisa selecionar as empresas que deseja excluir.')
                    return false
                }

                this.$confirm('Você tem certeza que deseja excluir as empresas selecionadas?', 'Excluir empresas', {
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    type: 'error'
                }).then(() => {
                    services.delete(this.selected)
                            .then(() => {
                                this.$message.success('As empresas selecionadas foram removidas.')
                                this.$store.dispatch('companies/FETCH_ALL')
                                this.selected = []
                            })
                            .catch(() => {
                                this.$message.error('Não foi possível remover as empresas selecionadas.')
                            })
                })
            }
        },

        mounted () {
            services.getTotal()
                    .then(response => {
                        this.total = response.data.total

                        if (this.total) {
                            this.$store.dispatch('companies/FETCH_ALL')
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