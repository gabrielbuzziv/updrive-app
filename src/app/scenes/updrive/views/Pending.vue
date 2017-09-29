<template>
    <page-load :loading="loading">
        <documents-list :documents="pendings">
            <template slot="not-found">
                <first-time title="Documentos pendentes" icon="clock"
                            message="Não encontramos documentos com vencimento pendente.">
                    <template slot="buttons">
                        <button class="btn btn-secondary btn-rounded margin-right-10" @click.prevent="$root.$emit('send::documents')" v-if="userCan('manage-updrive')">
                            <i class="mdi mdi-plus-circle margin-right-5"></i>
                            Enviar documentos
                        </button>

                        <route href="updrive.documents" class="btn btn-primary btn-rounded">
                            <i class="mdi mdi-archive margin-right-5"></i>
                            Ver todos os documentos
                        </route>
                    </template>
                </first-time>
            </template>
        </documents-list>

        <document-edit/>
    </page-load>
</template>

<script type="text/babel">
    import DocumentEdit from './partials/DocumentEdit'
    import DocumentsList from './partials/DocumentsList'
    import Helper from 'common/Helper'

    export default {
        components: { DocumentEdit, DocumentsList },

        data () {
            return {
                loading: true
            }
        },

        computed: {
            company () {
                return this.$store.getters['updrive/GET_COMPANY']
            },

            pendings () {
                return this.$store.getters['updrive/GET_PENDINGS']
            }
        },

        mounted () {
            this.$store.dispatch('updrive/FETCH_PENDINGS')
                    .then(() => {
                        this.$store.dispatch('updrive/GET_AMOUNTS')
                        this.loading = false
                    })
                    .catch(() => this.loading = false)

            window.socket.on('updrive:App\\Events\\DocumentStatusUpdated', (data) => {
                if (data.account == Helper.getAccount()) {
                    if (this.pendings.filter(document => document.id == data.document.id).length) {
                        this.$store.dispatch('updrive/FETCH_PENDINGS')
                    }
                }
            })
        }
    }
</script>