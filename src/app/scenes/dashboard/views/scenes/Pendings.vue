<template>
    <page-load>
        <panel class="dashboard-box dashboard-pendings">
            <template slot="heading">
                <h2 class="panel-title">Pendentes</h2>
                <h3 class="panel-subtitle">Documentos não abertos</h3>

                <div class="panel-options">
                    <button class="btn btn-blank" @click.prevent="load()">
                        <i class="mdi mdi-refresh"></i>
                    </button>
                </div>
            </template>

            <page-load :loading="loading">
                <div v-if="! loading">
                    <div class="documents" v-if="documents.length">
                        <div class="document" v-for="document in documents">
                            <div class="mdi icon" :class="document.type.icon"></div>

                            <span class="info">
                                <span class="name">
                                    {{ document.name }}
                                    <small v-if="document.validity">
                                        (com vencimento para {{ document.validity }})
                                    </small>
                                </span>
                                <span class="company">em {{ document.company.name }}</span>
                            </span>
                        </div>

                        <div class="block margin-top-30">
                            <route href="updrive.documents" :query="{ empresas: 'todas' }" class="btn btn-primary btn-rounded">
                                <i class="mdi mdi-plus margin-right-5"></i>
                                Ver todos
                            </route>
                        </div>
                    </div>

                    <div class="text-center" v-else>
                        <i class="mdi mdi-clock margin-right-5"></i>
                        Não há documentos pendentes no momento.

                        <div class="text-center block margin-top-20">
                            <button class="btn btn-secondary btn-rounded"
                                    @click.prevent="$root.$emit('open::composer')">
                                <i class="mdi mdi-plus-circle margin-right-5"></i>
                                Enviar documentos
                            </button>
                        </div>
                    </div>
                </div>
            </page-load>
        </panel>
    </page-load>
</template>

<script>
    import services from '../../services'

    export default {
        data () {
            return {
                documents: [],
                loading: true
            }
        },

        methods: {
            load () {
                this.loading = true
                services.getPendingDocuments()
                    .then(response => {
                        this.documents = response.data
                        this.loading = false
                    })
                    .catch(() => this.loading = false)
            }
        },

        mounted () {
            this.load()
        }
    }
</script>