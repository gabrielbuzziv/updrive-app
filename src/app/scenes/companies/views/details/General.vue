<template>
    <page-load :loading="loading">
        <div class="col-md-3">
            <panel title="Detalhes">
                <data-list>
                    <data-list-item name="Nome Fantasia">
                        {{ company.nickname || 'Não Informado' }}
                    </data-list-item>

                    <data-list-item name="E-mail">
                        {{ company.email || 'Não Informado' }}
                    </data-list-item>

                    <data-list-item name="CNPJ / CPF">
                        {{ company.taxvat || 'Não Informado' }}
                    </data-list-item>

                    <data-list-item name="Inscrição Estadual / RG">
                        {{ company.docnumber || 'Não Informado' }}
                    </data-list-item>

                    <data-list-item name="Inscrição Municipal">
                        {{ company.docnumber_town || 'Não Informado' }}
                    </data-list-item>

                </data-list>
            </panel>

            <panel title="Endereço">
                <data-list>
                    <data-list-item name="CEP">
                        {{ company.address.postcode || 'Não Informado' }}
                    </data-list-item>

                    <data-list-item name="Logradouro">
                        {{ company.address.street || 'Não Informado' }}
                        nº {{ company.address.number || 0 }}
                        ({{ company.address.complement || '...' }}),
                        Bairro {{ company.address.district || 'Não Informado' }}
                    </data-list-item>

                    <data-list-item name="Localidade">
                        {{ company.address.city || 'Não informado' }}
                        {{ company.address.state }}
                    </data-list-item>
                </data-list>
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
                company: {
                    address: {}
                },
                chartOptions: false
            }
        },

        mounted () {
            services.find(this.$route.params.id)
                    .then(response => {
                        this.company = response.data

                        services.getMonthlyOpenedDocuments(this.company.id)
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
