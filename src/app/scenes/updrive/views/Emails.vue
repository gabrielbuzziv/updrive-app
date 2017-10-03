<template>
    <page-load>
        <page-load :loading="loading">
            <div id="options-list">
                <div class="row">
                    <div class="col-md-6">
                    </div>

                    <div class="col-md-6">
                        <pagination namespace="tracking"></pagination>
                    </div>
                </div>
            </div>

            <panel class="nopadding">
                <div class="table-responsive">
                    <table class="table table-tracking">
                        <track-item :track="track" v-for="track in tracking"/>
                    </table>
                </div>
            </panel>
        </page-load>
    </page-load>
</template>

<script type="text/babel">
    import TrackItem from './partials/TrackItem'
    import services from '../services'
    import Helper from 'common/Helper'

    export default {
        components: { TrackItem },

        data () {
            return {
                loading: true,
                refreshing: false
            }
        },

        computed: {
            tracking () {
                return this.$store.getters['tracking/GET_TRACKING']
            }
        },

        methods: {
            loadTracking () {
                this.refreshing = true
                this.$store.dispatch('tracking/FETCH_ALL')
                        .then(() => this.refreshing = false)
                        .catch(() => this.refreshing = false)
            }
        },

        mounted () {
            this.$store.dispatch('tracking/FETCH_ALL')
                    .then(() => this.loading = false)
                    .catch(() => this.loading = false)

            window.socket.on('tracking:App\\Events\\NewMailTracking', (data) => {
                if (data.account == Helper.getAccount()) {
                    this.$store.dispatch('tracking/FETCH_ALL')
                }
            })
        }
    }
</script>
