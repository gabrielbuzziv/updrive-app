<template>
    <div class="document-item" :class="status.color">
        <div class="document-header" :class="{ 'opened': showDetails }">
            <div class="column name" @click="toggleDetails">
                <h3>{{ document.name }}</h3>

                <a href="#" class="company" @click.prevent="goToCompany">
                    {{ document.company.name }}
                </a>

                <span class="flag">
                    <i class="mdi mdi-flag margin-right-5"></i>
                    <span>{{ flag }}</span>
                </span>
            </div>

            <div class="column data hidden-sm hidden-xs" @click.prevent="toggleDetails">
                <ul>
                    <li>
                        <span>Competência</span>
                        <b>{{ document.cycle || 'Sem competência' }}</b>
                    </li>

                    <li>
                        <span>Vencimento</span>
                        <b>{{ document.validity || 'Sem vencimento' }}</b>
                    </li>

                    <li>
                        <span>Remetente</span>
                        <b>{{ document.user.name }}</b>
                    </li>

                    <li>
                        <span>Data de envio</span>
                        <b class="datetime">
                            <span>{{ getDate(document.created_at) }}</span>
                            <span>{{ getHour(document.created_at) }}</span>
                        </b>
                    </li>
                </ul>
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
                            <a href="#" @click.prevent="$root.$emit('details::dispatch', document.dispatch.id)"
                               v-if="hasDocumentDispatch">
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
                <div class="col-md-6">
                    <document-progress class="margin-left-20" :document="document"/>
                </div>

                <div class="col-md-6">
                    <div class="text-right block">
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

            flag () {
                const delivered = this.document.history
                    ? this.document.history.filter(history => history.action == 7).length
                    : []

                switch (this.document.status.id) {
                    case 2:
                        return delivered ? 'Entregue' : 'Enviado'
                    case 3:
                    case 4:
                        return 'Aberto'
                    case 5:
                        return 'Vencido'
                }

                return this.document
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
                        })
                })
            },

            goToCompany () {
                this.toggleDetails()
                this.$store.dispatch('updrive/UPDATE_COMPANY', this.document.company.id)
            },

            getDate (date) {
                return moment(date, 'DD/MM/YYYY HH:mm').format('D MMM YYYY')
            },

            getHour (date) {
                return moment(date, 'DD/MM/YYYY HH:mm').format('HH:mm')
            }
        },
    }
</script>
