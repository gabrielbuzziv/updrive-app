<template>
    <page-load :loading="loading">
        <div class="col-md-3">
            <panel title="Detalhes">
                <data-list>
                    <data-list-item name="E-mail">
                        {{ contact.email || 'Não Informado' }}
                    </data-list-item>

                    <data-list-item :name="phone.type.label" v-for="phone in contact.phones" :key="phone.id">
                        {{ phone.number || 'Não Informado' }}
                    </data-list-item>
                </data-list>
            </panel>

            <panel title="Endereço">
                <data-list>
                    <data-list-item name="CEP">
                        {{ contact.address.postcode || 'Não Informado' }}
                    </data-list-item>

                    <data-list-item name="Logradouro">
                        {{ contact.address.street || 'Não Informado' }}
                        nº {{ contact.address.number || 0 }}
                        ({{ contact.address.complement || '...' }}),
                        Bairro {{ contact.address.district || 'Não Informado' }}
                    </data-list-item>

                    <data-list-item name="Localidade">
                        {{ contact.address.city || 'Não informado' }}
                        {{ contact.address.state }}
                    </data-list-item>
                </data-list>
            </panel>
            </panel>
        </div>

        <div class="col-md-9">
            <panel title="Documentos">
                <chart id="monthly-opened-documents" :options="chartOptions" v-if="chartOptions" />
            </panel>
        </div>
    </page-load>
</template>

<script type="text/babel">
    import services from '../../services'

    export default {
        data () {
            return {
                loading: true,
                contact: {
                    address: {}
                },
                chartOptions: null
            }
        },

        mounted () {
            services.find(this.$route.params.id)
                    .then(response => {
                        this.contact = response.data

                        services.getMonthlyOpenedDocuments(this.$route.params.id)
                                .then(response => {
                                    const chart = response.data

                                    this.chartOptions = {
                                        chart: { type: 'column' },
                                        title: { text: '' },
                                        subtitle: { text: '' },
                                        xAxis: {
                                            categories: chart.labels,
                                            crosshair: true
                                        },
                                        yAxis: { min: 0, title: { text: '' } },
                                        series: chart.data,
                                        credits: { enabled: false },
                                        tooltip: { shared: true }
                                    }

                                    this.loading = false
                                })
                                .catch(() => {
                                    this.loading = false
                                })
                    })
                    .catch(() => {
                        this.loading = false
                    })
        }
    }
</script>