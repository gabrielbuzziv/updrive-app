<script src="../services/index.js"></script>
<template>
    <page-load id="dashboard">
        <page-content>
            <div class="row">
                <div class="col-md-8">
                    <overview/>

                    <div class="row">
                        <div class="col-lg-4 col-md-6">
                            <metrics title="Empresas" icon="mdi-briefcase">
                                {{ metrics.companies }} <span class="of">/ {{ companies_limit || '&infin;' }}</span>
                            </metrics>
                        </div>

                        <div class="col-lg-4 col-md-6">
                            <metrics title="Contatos" icon="mdi-account">
                                {{ metrics.contacts }} <span class="of">/ &infin;</span>
                            </metrics>
                        </div>

                        <div class="col-lg-4 col-md-6">
                            <metrics title="Documentos" icon="mdi-file-document-box">
                                {{ metrics.documents }} <span class="of">/ &infin;</span>
                            </metrics>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <pendings/>
                </div>
            </div>
        </page-content>

        <document-details />
    </page-load>
</template>

<script>
    import Overview from './scenes/Overview'
    import Pendings from './scenes/Pendings'
    import DocumentDetails from './scenes/DocumentDetails'
    import Metrics from './partials/Metrics'
    import services from '../services'

    export default {
        components: { Overview, Pendings, Metrics, DocumentDetails },

        data () {
            return {
                metrics: {
                    companies: 0,
                    contacts: 0,
                    documents: 0
                }
            }
        },

        computed: {
            account () {
                return this.$store.getters['global/GET_ACCOUNT']
            },

            companies_limit () {
                if (this.account && this.account.settings) {
                    return this.account.settings.filter(setting => setting.label == 'companies_limit')[0].value
                }
            }
        },

        methods: {
            load () {
                services.getMetrics()
                    .then(response => {
                        this.metrics.companies = response.data.companies
                        this.metrics.contacts = response.data.contacts
                        this.metrics.documents = response.data.documents

                        this.$store.dispatch('global/FETCH_ACCOUNT')
                    })
            }
        },

        mounted () {
            this.load()
        }
    }
</script>