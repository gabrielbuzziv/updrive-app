<template>
    <page-load v-if="visible">
        <panel class="nopadding" v-if="documents.length">
            <div class="table-responsive">
                <table class="table table-documents">
                    <document-item :document="document" v-for="document in documents" :key="document.id" />


                    <!--<tbody>-->
                        <!--<tr :class="getStatus(document.status.id).class" v-for="document in documents" :key="document.id">-->
                            <!--<td class="document-name">-->
                                <!--<span class="name" :class="{ 'margin-bottom-5': document.cycle || document.validity }">-->
                                    <!--{{ document.name }}-->
                                <!--</span>-->
                                <!--<span class="date" v-if="document.cycle || document.validity">-->
                                    <!--<span class="margin-right-15" v-if="document.cycle">-->
                                        <!--<i class="mdi mdi-calendar margin-right-5"></i>-->
                                        <!--{{ document.cycle }}-->
                                    <!--</span>-->

                                    <!--<span v-if="document.validity">-->
                                        <!--<i class="mdi mdi-calendar-remove margin-right-5"></i>-->
                                        <!--{{ document.validity }}-->
                                    <!--</span>-->
                                <!--</span>-->
                            <!--</td>-->
                            <!--<td v-if="showCompany">-->
                                <!--<document-company :document="document"/>-->
                            <!--</td>-->
                            <!--<td class="document-option text-right" width="180" v-if="userCan('manage-updrive')">-->
                                <!--<div class="btn-group">-->
                                    <!--<button class="btn btn-sm btn-rounded" @click="document.details">-->
                                        <!--&lt;!&ndash;<i class="mdi mdi-magnify margin-right-5"></i>&ndash;&gt;-->
                                        <!--Detalhes ({{ document.details }} )-->
                                    <!--</button>-->

                                    <!--<dropdown buttonClass="btn btn-sm btn-rounded" right>-->
                                        <!--<template slot="button">-->
                                            <!--<i class="mdi mdi-chevron-down"></i>-->
                                        <!--</template>-->

                                        <!--<template slot="items">-->
                                            <!--<li class="item">-->
                                                <!--<a :href="`${document.links.download}?token=${token}`">-->
                                                    <!--<i class="mdi mdi-arrow-down-bold-circle margin-right-5"></i>-->
                                                    <!--Baixar-->
                                                <!--</a>-->
                                            <!--</li>-->
                                            <!--<li class="item">-->
                                                <!--<a :href="`${document.links.visualize}?token=${token}`"-->
                                                   <!--target="_blank">-->
                                                    <!--<i class="mdi mdi-eye margin-right-5"></i>-->
                                                    <!--Visualizar-->
                                                <!--</a>-->
                                            <!--</li>-->
                                            <!--<li class="item" v-if="userCan('manage-updrive')">-->
                                                <!--<a :href="`${API_URL}/documents/${document.id}/protocol?token=${token}`"-->
                                                   <!--target="_blank">-->
                                                    <!--<i class="mdi mdi-receipt margin-right-5"></i>-->
                                                    <!--Gerar Protocolo-->
                                                <!--</a>-->
                                            <!--</li>-->
                                            <!--<li class="item" v-if="userCan('manage-updrive')">-->
                                                <!--<a href="#" @click.prevent="editDocument(document.id)">-->
                                                    <!--<i class="mdi mdi-pencil-circle margin-right-5"></i>-->
                                                    <!--Editar-->
                                                <!--</a>-->
                                            <!--</li>-->
                                            <!--<div class="divider" v-if="userCan('manage-updrive')"></div>-->
                                            <!--<li class="item" v-if="userCan('manage-updrive')">-->
                                                <!--<a href="#" @click.prevent="removeDocument(document.id)">-->
                                                    <!--<i class="mdi mdi-delete-circle margin-right-5"></i>-->
                                                    <!--Excluir-->
                                                <!--</a>-->
                                            <!--</li>-->
                                        <!--</template>-->
                                    <!--</dropdown>-->
                                <!--</div>-->
                            <!--</td>-->
                            <!--<td v-else>-->
                                <!--<a :href="`${document.links.download}?token=${token}`"-->
                                   <!--class="btn btn-sm btn-rounded">-->
                                    <!--<i class="mdi mdi-arrow-down-bold-circle margin-right-5"></i>-->
                                    <!--Baixar-->
                                <!--</a>-->
                            <!--</td>-->
                        <!--</tr>-->
                    <!--</tbody>-->
                </table>
            </div>
        </panel>

        <slot name="not-found" v-else>
            <first-time title="Não encontramos documentos" icon="file-multiple"
                        message="Não encontramos documentos aqui.">
                <template slot="buttons">
                    <button class="btn btn-secondary btn-rounded" @click="$root.$emit('send::documents')"
                            v-if="userCan('manage-updrive')">
                        <i class="mdi mdi-plus-circle margin-right-5"></i>
                        Enviar documentos
                    </button>
                </template>
            </first-time>
        </slot>
    </page-load>
</template>

<script type="text/babel">
    import DocumentItem from './DocumentItem'
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

        components: { DocumentItem, DocumentCompany, DocumentLabel },

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
            },

            getStatus (status) {
                switch (status) {
                    case 2:
                        return {
                            class: 'warning',
                            icon: 'mdi-clock'
                        }
                    case 3:
                        return {
                            class: 'success',
                            icon: 'mdi-check'
                        }
                    case 4:
                        return {
                            class: 'danger',
                            icon: 'calendar-remove'
                        }
                }
            }
        }
    }
</script>
