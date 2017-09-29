<template>
    <page-load :loading="loading">
        <documents-filter/>
        <documents-list :documents="documents"/>

        <document-edit/>
    </page-load>
</template>

<script type="text/babel">
    import services from '../services'
    import DocumentEdit from './partials/DocumentEdit'
    import DocumentsList from './partials/DocumentsList'
    import DocumentsFilter from './partials/DocumentsFilter'
    import Helper from 'common/Helper'
    import { isEmpty, debounce } from 'lodash'

    export default {
        components: { DocumentsList, DocumentsFilter, DocumentEdit },

        data () {
            return {
                loading: true,
            }
        },

        computed: {
            company () {
                return this.$store.getters['updrive/GET_COMPANY']
            },

            documents () {
                return this.$store.getters['updrive/GET_ALL']
            },
        },

        methods: {
            load () {
                this.$store.dispatch('updrive/FETCH_ALL')
                        .then(() => {
                            this.$store.dispatch('updrive/GET_AMOUNTS')
                            this.loading = false
                        })
                        .catch(() => this.loading = false)
            },
        },

        mounted () {
            this.load()

            window.socket.on('documents:App\\Events\\DocumentStatusUpdated', (data) => {
                if (data.account == Helper.getAccount()) {
                    if (this.documents.filter(document => document.id == data.document.id).length) {
                        this.$store.dispatch('updrive/FETCH_ALL')
                    }
                }
            })
        }
    }
</script>