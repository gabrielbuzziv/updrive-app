<template>
    <page-load :loading="loading">
        <documents-filter/>
        <documents-list :documents="documents"/>

        <document-edit/>
        <document-status/>
    </page-load>
</template>

<script type="text/babel">
    import services from '../services'
    import DocumentEdit from './partials/DocumentEdit'
    import DocumentsList from './partials/DocumentsList'
    import DocumentStatus from './partials/DocumentStatus'
    import DocumentsFilter from './partials/DocumentsFilter'
    import { isEmpty, debounce } from 'lodash'

    export default {
        components: { DocumentsList, DocumentsFilter, DocumentEdit, DocumentStatus },

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
        }
    }
</script>