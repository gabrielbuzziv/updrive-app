<template>
    <div class="document-item" :class="status.color">
        <div class="document-header">
            <div class="column toggle" @click.prevent="toggleDetails" :class="{ 'opened': showDetails }">
                <i class="mdi mdi-chevron-down"></i>
            </div>

            <div class="column name" @click="toggleDetails" :class="{ 'opened': showDetails }">
                <h3 :class="{ 'margin-bottom-5': ! company }">{{ document.name }}</h3>

                <span v-if="! company">
                    Enviado para <b class="company-anchor">{{ document.company.name }}</b>
                </span>
            </div>

            <div class="column status" @click.prevent="toggleDetails" :class="{ 'opened': showDetails }">
                <div>
                    <i class="mdi" :class="status.icon"></i>
                    <span>{{ status.label }}</span>
                </div>
            </div>

            <div class="column options" v-if="userCan('manage-core')">
                <dropdown button-class="btn" right>
                    <template slot="button">
                        <i class="mdi mdi-dots-vertical"></i>
                    </template>

                    <template slot="items">
                        <div class="item">
                            <a href="#" @click.prevent="edit">
                                <i class="mdi mdi-pencil margin-right-5"></i>
                                Editar
                            </a>
                        </div>

                        <div class="item">
                            <a href="#" @click.prevent="$root.$emit('details::dispatch', document.dispatch.id)" v-if="hasDocumentDispatch">
                                <i class="mdi mdi-email margin-right-5"></i>
                                Detalhes do e-mail
                            </a>
                        </div>

                        <div class="divider"></div>

                        <div class="item">
                            <a href="#" @click.prevent="remove">
                                <i class="mdi mdi-delete margin-right-5"></i>
                                Remover
                            </a>
                        </div>
                    </template>
                </dropdown>
            </div>
        </div>

        <div class="document-details" v-if="showDetails">
            <div class="row details">
                <div class="col-md-4 item">
                    <b>Data de envio</b>
                    <span>{{ document.created_at }}</span>
                </div>

                <div class="col-md-4 item">
                    <b>Competência</b>
                    <span>{{ document.cycle || 'Sem Competência' }}</span>
                </div>

                <div class="col-md-4 item">
                    <b>Vencimento</b>
                    <span>{{ document.validity || 'Sem Validade' }}</span>
                </div>

                <div class="col-md-4 item">
                    <b>Empresa</b>
                    <span>{{ document.company.name }}</span>
                </div>

                <div class="col-md-4 item">
                    <b>Remetente</b>
                    <span>{{ document.user.name }}</span>
                </div>

                <div class="col-md-4 item">
                    <b>Destinatário</b>
                    <span>{{ sharedWith }}</span>
                </div>

                <div class="col-md-12">
                    <document-progress :document="document"/>
                </div>

                <div class="col-md-12">
                    <div class="text-center block margin-top-50">
                        <a :href="`${API_URL}/documents/${document.id}/protocol?token=${token}`"
                           class="btn margin-right-5"
                           target="_blank" v-if="userCan('manage-core')">
                            <i class="mdi mdi-clipboard-text margin-right-5"></i>
                            Gerar Protocolo
                        </a>

                        <a :href="`${document.links.download}?token=${token}`"
                           class="btn margin-right-5" title="Download">
                            <i class="mdi mdi-download"></i>
                            Download
                        </a>

                        <a :href="`${document.links.visualize}?token=${token}`"
                           class="btn margin-right-5" target="_blank" title="Visualizar">
                            <i class="mdi mdi-eye margin-right-5"></i>
                            Visualizar
                        </a>
                    </div>
                </div>

                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import DocumentProgress from './DocumentProgress'
    import services from '../../services'

    export default {
        props: ['document'],

        components: { DocumentProgress },

        data () {
            return {
                showDetails: false
            }
        },

        computed: {
            hasDocumentDispatch () {
                return this.document.dispatch && this.document.dispatch.id
            },

            status () {
                switch (this.document.status.id) {
                    case 2:
                        return {
                            label: 'Pendente',
                            color: 'warning',
                            icon: 'mdi-clock'
                        }
                    case 3:
                        return {
                            label: 'Aberto',
                            color: 'success',
                            icon: 'mdi-check-circle'
                        }
                    case 4:
                        return {
                            label: 'Vencido',
                            color: 'danger',
                            icon: 'mdi-close-circle'
                        }
                }
            },

            company () {
                return this.$store.getters['updrive/GET_COMPANY']
            },

            token () {
                return localStorage.getItem('auth_token')
            },

            sharedWith () {
                return this.document.sharedWith.map(contact => contact.name).join(', ')
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
                            this.$store.dispatch('updrive/FETCH_ALL')
                            this.$store.dispatch('updrive/GET_AMOUNTS')
                        })
                })
            },

            goToCompany () {
                this.toggleDetails()
                this.$store.dispatch('updrive/UPDATE_COMPANY', this.document.company.id)
            }
        },
    }
</script>
