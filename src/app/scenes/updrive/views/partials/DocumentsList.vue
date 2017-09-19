<template>
    <page-load v-if="visible">
        <panel v-if="documents.length">
            <div class="table-responsive">
                <table class="table table-documents">
                    <thead>
                        <tr>
                            <th class="document-icon" width="40"></th>
                            <th class="document-name">Documento</th>
                            <th class="text-center">
                                Competência
                                <el-tooltip content="Mês/ano que o documento é referente." placement="top"
                                            class="margin-left-5">
                                    <i class="mdi mdi-information"></i>
                                </el-tooltip>
                            </th>
                            <th class="text-center">
                                Vencimento
                                <el-tooltip content="Data limite de validade do documento." placement="top"
                                            class="margin-left-5">
                                    <i class="mdi mdi-information"></i>
                                </el-tooltip>
                            </th>
                            <th v-if="showCompany">Empresa</th>
                            <th>
                                Status
                                <el-tooltip placement="top" class="margin-left-5">
                                    <template slot="content">
                                        <p><b>Pendente:</b> documento enviado, mas ainda não visualizado/baixado.</p>
                                        <p><b>Visualizado:</b> documento visualizado/baixado por um dos contatos
                                            destinatários.</p>
                                        <p class="margin-bottom-0"><b>Vencido:</b> documento que não foi visualizado antes
                                            da data de vencimento.</p>
                                    </template>

                                    <i class="mdi mdi-information"></i>
                                </el-tooltip>
                            </th>
                            <th class="document-option" width="160"></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="document in documents" :key="document.id">
                            <td class="document-icon">
                                <i class="mdi file" :class="document.type.icon"></i>
                            </td>
                            <td class="document-name">
                                <document-name :document="document"/>
                            </td>
                            <td class="text-center">{{ document.cycle || '-' }}</td>
                            <td class="text-center">{{ document.validity || '-' }}</td>
                            <td v-if="showCompany">
                                <document-company :document="document"/>
                            </td>
                            <td>
                                <document-label :document="document"/>
                            </td>
                            <td class="document-option text-right">
                                <div class="btn-group">
                                    <a :href="`${document.links.download}?token=${token}`"
                                       class="btn btn-default btn-rounded">
                                        <i class="mdi mdi-arrow-down-bold-circle margin-right-5"></i>
                                        Baixar
                                    </a>

                                    <dropdown buttonClass="btn btn-default btn-rounded" right>
                                        <template slot="button">
                                            <i class="mdi mdi-chevron-down"></i>
                                        </template>

                                        <template slot="items">
                                            <li class="item">
                                                <a :href="`${document.links.visualize}?token=${token}`"
                                                   target="_blank">
                                                    <i class="mdi mdi-eye margin-right-5"></i>
                                                    Visualizar
                                                </a>
                                            </li>
                                            <li class="item">
                                                <a href="#" @click.prevent="statusDocument(document.id)">
                                                    <i class="mdi mdi-history margin-right-5"></i>
                                                    Histórico
                                                </a>
                                            </li>
                                            <li class="item" v-if="userCan('manage-updrive')">
                                                <a :href="`${API_URL}/documents/${document.id}/protocol?token=${token}`"
                                                   target="_blank">
                                                    <i class="mdi mdi-receipt margin-right-5"></i>
                                                    Gerar Protocolo
                                                </a>
                                            </li>
                                            <li class="item" v-if="userCan('manage-updrive')">
                                                <a href="#" @click.prevent="editDocument(document.id)">
                                                    <i class="mdi mdi-pencil-circle margin-right-5"></i>
                                                    Editar
                                                </a>
                                            </li>
                                            <div class="divider" v-if="userCan('manage-updrive')"></div>
                                            <li class="item" v-if="userCan('manage-updrive')">
                                                <a href="#" @click.prevent="removeDocument(document.id)">
                                                    <i class="mdi mdi-delete-circle margin-right-5"></i>
                                                    Excluir
                                                </a>
                                            </li>
                                        </template>
                                    </dropdown>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </panel>

        <slot name="not-found" v-else></slot>
    </page-load>
</template>

<script type="text/babel">
    import DocumentName from './DocumentName'
    import DocumentCompany from './DocumentCompany'
    import DocumentLabel from './DocumentLabel'
    import services from '../../services'

    export default {
        props: {
            documents: {
                type: Array,
                required: true
            },

            hideable: {
                type: Boolean,
                default: false
            },
        },

        components: { DocumentName, DocumentCompany, DocumentLabel },

        computed: {
            token () {
                return localStorage.getItem('auth_token')
            },

            visible () {
                return this.hideable && ! this.documents.length ? false : true
            },

            showCompany () {
                if (this.$store.getters['updrive/GET_COMPANY']) {
                    return false
                }

                return true
            }
        },

        methods: {
            statusDocument (id) {
                this.$root.$emit('status::document', id)
            },

            editDocument (id) {
                this.$root.$emit('edit::document', id)
            },

            removeDocument (id) {
                this.$confirm('Você tem certeza que deseja remover o documento?', 'Remover Documento', {
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    type: 'error'
                }).then(() => {
                    services.removeDocument(id)
                            .then(response => {
                                this.$message.success('Documento removido com sucesso.')
                                this.$store.dispatch('updrive/FETCH_PENDINGS')
                                this.$store.dispatch('updrive/FETCH_ALL')
                                this.$store.dispatch('updrive/GET_AMOUNTS')
                            })
                }).catch(() => {
                })
            }
        }
    }
</script>
