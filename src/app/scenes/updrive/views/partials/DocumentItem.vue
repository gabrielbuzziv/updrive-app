<template>
    <tbody>
        <tr :class="documentStatus">
            <td class="document-options" width="30" v-if="userCan('manage-updrive')">
                <dropdown class="inline" button-class="btn btn-sm btn-blank btn-rounded">
                    <template slot="button">
                        <i class="mdi mdi-settings"></i>
                    </template>

                    <template slot="items">
                        <li class="item" v-if="userCan('manage-updrive')">
                            <a href="#" @click.prevent="edit">
                                <i class="mdi mdi-pencil-circle margin-right-5"></i>
                                Editar
                            </a>
                        </li>
                        <div class="divider" v-if="userCan('manage-updrive')"></div>
                        <li class="item" v-if="userCan('manage-updrive')">
                            <a href="#" @click.prevent="remove">
                                <i class="mdi mdi-delete-circle margin-right-5"></i>
                                Excluir
                            </a>
                        </li>
                    </template>
                </dropdown>
            </td>

            <!--Document name-->
            <td class="document-name">
                <span class="name">{{ document.name }}</span>

                <span class="date" v-if="document.cycle || document.validity">
                    <span class="margin-right-15" v-if="document.cycle">
                        <i class="mdi mdi-calendar margin-right-5"></i>
                        {{ document.cycle }}
                    </span>

                    <span v-if="document.validity">
                        <i class="mdi mdi-calendar-remove margin-right-5"></i>
                        {{ document.validity }}
                    </span>
                </span>
            </td>

            <!-- Document Company -->
            <td class="document-company" v-if="! company">
                <document-company :document="document"/>
            </td>

            <!-- Document Options -->
            <td class="document-options text-right">
                <button class="btn btn-sm btn-rounded inline" @click.prevent="toggleDetails">
                    <i class="mdi mdi-chevron-up" v-if="showDetails"></i>
                    <i class="mdi mdi-chevron-down" v-else></i>
                </button>
            </td>
        </tr>
        <tr class="details" v-if="showDetails">
            <td :colspan="detailColspan">
                <div class="row">
                    <div class="col-md-12 margin-bottom-25">
                        <h3>{{ document.name }}</h3>

                        <div class="pull-right">
                            <a :href="`${API_URL}/documents/${document.id}/protocol?token=${token}`"
                               class="btn btn-sm btn-rounded margin-right-5"
                               target="_blank" v-if="userCan('manage-updrive')">
                                <i class="mdi mdi-file margin-right-5"></i>
                                Gerar Protocolo
                            </a>

                            <a :href="`${document.links.download}?token=${token}`"
                               class="btn btn-sm btn-rounded margin-right-5" title="Download">
                                <i class="mdi mdi-download"></i>
                            </a>

                            <a :href="`${document.links.visualize}?token=${token}`"
                               class="btn btn-sm btn-rounded margin-right-5" target="_blank" title="Visualizar">
                                <i class="mdi mdi-magnify"></i>
                            </a>

                            <a href="#" @click.prevent="edit" class="btn btn-sm btn-rounded margin-right-5"
                               title="Editar" v-if="userCan('manage-updrive')">
                                <i class="mdi mdi-pencil"></i>
                            </a>

                            <a href="#" @click.prevent="remove" class="btn btn-sm btn-rounded" title="Excluir"
                               v-if="userCan('manage-updrive')">
                                <i class="mdi mdi-delete"></i>
                            </a>
                        </div>

                        <div class="clearfix"></div>
                    </div>

                    <div class="col-md-12 document-details">
                        <ul>
                            <li>
                                <b>Competência:</b>
                                <span>{{ document.cycle || 'Sem competência' }}</span>
                            </li>
                            <li>
                                <b>Vencimento:</b>
                                <span>{{ document.validity || 'Sem vencimento' }}</span>
                            </li>
                            <li>
                                <b>Empresa:</b>
                                <span>{{ document.company.name }}</span>
                            </li>
                            <li>
                                <b>Remetente</b>
                                <span>{{ document.user.name }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="col-md-12 document-status"  v-if="userCan('manage-updrive')">
                        <b>Histórico</b>
                        <document-status :document="document"/>
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script type="text/babel">
    import DocumentCompany from './DocumentCompany'
    import DocumentStatus from './DocumentStatus'
    import services from '../../services'

    export default {
        props: ['document'],

        components: { DocumentCompany, DocumentStatus },

        data () {
            return {
                showDetails: false
            }
        },

        computed: {
            documentStatus () {
                switch (this.document.status.id) {
                    case 2:
                        return 'warning'
                    case 3:
                        return 'success'
                    case 4:
                        return 'danger'
                }
            },

            company () {
                return this.$store.getters['updrive/GET_COMPANY']
            },

            token () {
                return localStorage.getItem('auth_token')
            },

            detailColspan () {
                return this.company ? 3 : 4
            }
        },

        methods: {
            toggleDetails () {
                this.showDetails = ! this.showDetails
            },

            edit () {
                this.$root.$emit('edit::document', this.document.id)
            },

            remove () {
                this.$confirm('Você tem certeza que deseja remover o documento?', 'Remover Documento', {
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    type: 'error'
                }).then(() => {
                    services.removeDocument(this.document.id)
                            .then(() => {
                                this.$message.success('Documento removido com sucesso.')
                                this.$store.dispatch('updrive/FETCH_PENDINGS')
                                this.$store.dispatch('updrive/FETCH_ALL')
                                this.$store.dispatch('updrive/GET_AMOUNTS')
                            })
                })
            },
        },
    }
</script>
