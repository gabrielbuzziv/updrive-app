<template>
    <page-load :loading="loading">
        <div id="options-list">
            <div class="row">
                <div class="col-md-8 col-sm-6">
                    <div class="search">
                        <i class="mdi mdi-magnify"></i>
                        <input type="text"
                               class="form-control"
                               placeholder="Buscar"
                               v-model="query"
                               v-focus
                               @input="filterMembers">
                    </div>
                </div>

                <div class="col-md-4 col-sm-6 text-right">
                    <button class="btn btn-primary btn-rounded margin-top-10 margin-right-10" @click.prevent="$root.$emit('invite::members')">
                        <i class="mdi mdi-account-plus margin-right-5"></i>
                        Convidar Membro
                    </button>
                </div>

                <div class="clearfix"></div>
            </div>
        </div>

        <panel>
            <div class="table-responsive">
                <table class="table table-members">
                    <thead>
                        <tr>
                            <th>Membro</th>
                            <th class="text-center">
                                <i class="mdi mdi-key margin-right-5"></i>
                                Gerenciar Conta
                            </th>
                            <th class="text-center">
                                <i class="mdi mdi-account-multiple margin-right-5"></i>
                                Gerenciar Membros
                            </th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="member in members">
                            <td>
                                <span class="name">
                                    {{ member.name }}

                                    <span class="label label-success label-icon" v-if="member.active">
                                        <i class="mdi mdi-check"></i>
                                    </span>

                                    <span class="label label-warning" v-else>
                                        <i class="mdi mdi-clock margin-right-5"></i>
                                        Pendente
                                    </span>
                                </span>
                                <span class="email">{{ member.email }}</span>
                            </td>
                            <td class="text-center">
                                <toggle-permission :member.sync="member" permission="manage-account" />
                            </td>
                            <td class="text-center">
                                <toggle-permission :member.sync="member" permission="manage-users" />
                            </td>
                            <td class="text-right">
                                <button class="btn btn-default btn-sm btn-rounded" @click.prevent="revoke(member.id)">
                                    <i class="mdi mdi-delete-circle margin-right-5"></i>
                                    Revogar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </panel>

        <invite-members/>
    </page-load>
</template>

<script type="text/babel">
    import InviteMembers from './members/Invite'
    import TogglePermission from './members/TogglePermission'
    import services from '../services'
    import { debounce } from 'lodash'

    export default {
        components: { InviteMembers, TogglePermission },

        data () {
            return {
                query: '',
                loading: true
            }
        },

        computed: {
            members () {
                return this.$store.getters['settings/GET_MEMBERS'].map(member => {
                    member.manager = member.permissions.indexOf('manage-users') > -1
                    return member
                })
            },
        },

        methods: {
            filterMembers: debounce (function () {
                const query = this.query

                this.$store.commit('settings/FILTER', query)
                this.$store.dispatch('settings/FETCH_MEMBERS')
            }, 300),

            revoke (id) {
                this.$confirm('Tem certeza que deseja revogar este membro?', 'Revogar', {
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    type: 'error'
                }).then(() => {
                    services.revoke(id)
                            .then(response => {
                                this.$message.success('Membro revogado.')
                                this.$store.dispatch('settings/FETCH_MEMBERS')
                            })
                            .catch(() => this.$message.warning('Você não pode remover este membro.'))
                })
            }
        },

        mounted () {
            this.query = this.$store.getters['settings/GET_FILTER']
            this.$store.dispatch('settings/FETCH_MEMBERS')
                    .then(() => this.loading = false)
                    .catch(() => this.loading = false)
        }
    }
</script>
