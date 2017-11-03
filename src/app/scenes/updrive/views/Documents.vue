<template>
    <page-load :loading="loading">
        <documents-filter/>
        <documents-list :documents="documents"/>

        <document-edit/>
        <document-dispatch-details/>
    </page-load>
</template>

<script type="text/babel">
    import services from '../services'
    import DocumentEdit from './partials/DocumentEdit'
    import DocumentsList from './partials/DocumentsList'
    import DocumentsFilter from './partials/DocumentsFilter'
    import DocumentDispatchDetails from './partials/DocumentDispatchDetails'
    import Helper from 'common/Helper'
    import { isEmpty, debounce } from 'lodash'

    export default {
        components: { DocumentsList, DocumentsFilter, DocumentEdit, DocumentDispatchDetails },

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
                    .then(() => this.loading = false)
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

            window.socket.on('tracking:App\\Events\\NewMailTracking', (data) => {
                if (data.account == Helper.getAccount()) {
                    this.$store.dispatch('updrive/FETCH_ALL')
                }
            })
        }
    }
</script>