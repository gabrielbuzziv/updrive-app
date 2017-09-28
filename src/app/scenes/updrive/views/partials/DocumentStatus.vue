<template>
    <div class="document-history">
        <div class="row">
            <document-status-type :type="sent" />
            <div class="col-md-1 divider" v-if="opened.length">
                <i class="mdi mdi-arrow-right"></i>
            </div>
            <document-status-type :type="opened" />
            <div class="col-md-1 divider" v-if="expired.length">
                <i class="mdi mdi-arrow-right"></i>
            </div>
            <document-status-type :type="expired" />
        </div>
    </div>
</template>

<script type="text/babel">
    import DocumentStatusType from './DocumentStatusType'
    import services from '../../services'

    export default {
        props: ['document'],

        components: { DocumentStatusType },

        computed: {
            sent () {
                return this.document && this.document.history
                        ? this.document.history.filter(history => history.action == 2)
                        : []
            },

            opened () {
                return this.document && this.document.history
                        ? this.document.history.filter(history => history.action == 3 || history.action == 4)
                        : []
            },

            expired () {
                return this.document && this.document.history
                        ? this.document.history.filter(history => history.action == 5)
                        : []
            }
        },
    }
</script>