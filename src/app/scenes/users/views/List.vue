<template>
    <page-load>
        <page-header title="Colaboradores">
            <template slot="right">
                <button class="btn btn-rounded margin-right-5" @click.prevent="onRemove">
                    <i class="mdi mdi-delete-circle margin-right-5"></i>
                    Excluir
                </button>

                <button class="btn btn-secondary btn-rounded" @click.prevent="addUser">
                    <i class="mdi mdi-plus-circle margin-right-5"></i>
                    Adicionar colaboradores
                </button>
            </template>
        </page-header>

        <page-content>
            <page-load :loading="loading">
                <options-list namespace="users"/>

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
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="user in users">
                                    <td>
                                        <el-checkbox v-model="selected" :label="user.id">&nbsp;</el-checkbox>
                                    </td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </panel>
            </page-load>
        </page-content>

        <create-user />
    </page-load>
</template>

<script type="text/babel">
    import CreateUser from './Create'
    import services from '../services'

    export default {
        components: { CreateUser },

        data () {
            return {
                selected: [],
                loading: true
            }
        },

        computed: {
            users () {
                return this.$store.getters['users/GET_ALL']
            },

            selectAll: {
                get () {
                    return this.users ? this.selected.length == this.users.length : false
                },

                set (select) {
                    this.selected = ! select ? [] : this.users.map(user => user.id)
                }
            }
        },

        methods: {
            addUser () {
                this.$root.$emit('create::user')
            },

            onRemove () {
                if (! this.selected.length) {
                    this.$message.info('Você precisa selecionar os usuários que deseja excluir.')
                    return false
                }

                this.$confirm('Você tem certeza que deseja excluir as colaboradores selecionadas?', 'Excluir', {
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    type: 'error'
                }).then(() => {
                    const selected = this.selected.length
                    services.delete(this.selected)
                            .then(response => {
                                if (selected == response.data.total) {
                                    this.$message.success('Os usuários selecionados foram removidos.')
                                } else {
                                    this.$message.warning('Um ou mais usuários não foram removidos, pois são administradores.')
                                }
                                this.$store.dispatch('users/FETCH_ALL')
                                this.selected = []
                            })
                            .catch(() => {
                                this.$message.error('Não foi possível remover as colaboradores selecionadas.')
                            })
                })
            }
        },

        mounted () {
            this.$store.dispatch('users/FETCH_ALL')
                    .then(() => {
                        this.loading = false
                    })
                    .catch(() => this.loading = false)
        },
    }
</script>