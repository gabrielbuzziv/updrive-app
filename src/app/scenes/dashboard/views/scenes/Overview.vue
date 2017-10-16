<template>
    <panel class="dashboard-box dashboard-overview">
        <template slot="heading">
            <h2 class="panel-title">Visão Geral</h2>
            <h3 class="panel-subtitle">Movimentação dos documentos</h3>

            <div class="panel-options">
                <button class="btn btn-blank" @click.prevent="load">
                    <i class="mdi mdi-refresh"></i>
                </button>

                <dropdown button-class="btn btn-blank" right>
                    <template slot="button">
                        <i class="mdi mdi-settings"></i>
                    </template>

                    <template slot="items">
                        <div class="item">
                            <a href="#" @click.event="setInterval('week')">
                                <i class="mdi mdi-calendar-range margin-right-5"></i>
                                Últimos 7 dias
                            </a>
                        </div>

                        <div class="item">
                            <a href="#" @click.event="setInterval('month')">
                                <i class="mdi mdi-calendar margin-right-5"></i>
                                Últimos 30 dias
                            </a>
                        </div>

                        <div class="item">
                            <a href="#" @click.event="setInterval('year')">
                                <i class="mdi mdi-calendar-multiple margin-right-5"></i>
                                Últimos 12 meses
                            </a>
                        </div>
                    </template>
                </dropdown>
            </div>
        </template>

        <page-load :loading="loading">
            <chart id="overview" :options="chartOptions" v-if="chartOptions"/>

            <div class="row text-center margin-top-30 overview-resume">
                <div class="col-md-6 resume">
                    <b>{{ sent }}</b>
                    <span>Enviados</span>
                </div>

                <div class="col-md-6 resume">
                    <b>{{ opened }}</b>
                    <span>Abertos</span>
                </div>
            </div>
        </page-load>
    </panel>
</template>

<script>
    import services from '../../services'

    export default {
        data () {
            return {
                loading: true,
                interval: 'month',
                chartOptions: {
                    chart: { type: 'area' },
                    title: { text: '' },
                    subtitle: { text: '' },
                    xAxis: {
                        categories: [],
                        crosshair: true,
                    },
                    yAxis: { min: 0, title: { text: '' }, gridLineColor: 'transparent', labels: { enabled: false } },
                    series: [],
                    credits: { enabled: false },
                    tooltip: { shared: true },
                },
                sent: 0,
                opened: 0,
            }
        },

        methods: {
            load () {
                this.loading = true

                services.getOverview(this.interval)
                    .then(response => {
                        const chart = response.data

                        this.sent = chart.sent
                        this.opened = chart.opened
                        this.chartOptions.xAxis.categories = chart.labels
                        this.chartOptions.series = chart.data
                        this.loading = false
                    })
                    .catch(() => this.loading = false)
            },

            setInterval (interval) {
                this.interval = interval
                this.load()
            }
        },

        mounted () {
            this.load()
        }
    }
</script>