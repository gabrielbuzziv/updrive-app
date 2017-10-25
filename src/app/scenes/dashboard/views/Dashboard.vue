<script src="../services/index.js"></script>
<template>
    <page-load id="dashboard">
        <page-content>
            <div class="row">
                <div class="col-md-8">
                    <overview/>

                    <div class="row">
                        <div class="col-lg-4 col-md-6">
                            <metrics title="Empresas" icon="mdi-store">
                                {{ metrics.companies }}
                            </metrics>
                        </div>

                        <div class="col-lg-4 col-md-6">
                            <metrics title="Contatos" icon="mdi-account">
                                {{ metrics.contacts }}
                            </metrics>
                        </div>

                        <div class="col-lg-4 col-md-6">
                            <metrics title="Documentos" icon="mdi-file-document-box">
                                {{ metrics.documents }}
                            </metrics>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <pendings/>
                </div>
            </div>
        </page-content>
    </page-load>
</template>

<script>
    import Overview from './scenes/Overview'
    import Pendings from './scenes/Pendings'
    import Metrics from './partials/Metrics'
    import services from '../services'

    export default {
        components: { Overview, Pendings, Metrics },

        data () {
            return {
                metrics: {
                    companies: 0,
                    contacts: 0,
                    documents: 0
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
                    })
            }
        },

        mounted () {
            this.load()
        }
    }
</script>