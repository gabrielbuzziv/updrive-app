<template>
    <page-load :loading="loading">
        <table class="table" v-if="reports.length">
            <thead>
                <tr>
                    <th>Relatório</th>
                    <th>Filtros</th>
                    <th>Gerado por</th>
                    <th>Gerado em</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="report in reports">
                    <td>
                        <route href="reports.status.result" :params="{ id: report.id }">
                            {{ title }} #{{ report.id }}
                        </route>
                    </td>
                    <td>
                        <ul class="filters">
                            <li v-for="filter, index in report.filters" v-if="isValidFilter(filter)">
                                <i class="mdi margin-right-5" :class="getFilter(filter, index).icon"></i>
                                {{ getFilter(filter, index).value }}
                            </li>
                        </ul>
                    </td>
                    <td>{{ report.user.name }}</td>
                    <td>{{ getDate(report.created_at) }}</td>
                    <td class="text-right">
                        <route href="reports.status.result" :params="{ id: report.id }" class="btn btn-default">
                            <i class="mdi mdi-magnify margin-right-5"></i>
                            Consultar
                        </route>
                    </td>
                </tr>
            </tbody>
        </table>
    </page-load>
</template>

<script>
    export default {
        props: ['report'],

        data () {
            return {
                loading: true
            }
        },

        computed: {
            title () {
                switch (this.report) {
                    case 1:
                        return 'Situação Documentos'
                }
            },

            reports () {
                return this.$store.getters['reports/GET_REPORTS']
            }
        },

        methods: {
            isValidFilter (filter) {
                return filter != null && filter != ''
            },

            getFilter (filter, index) {
                switch (index) {
                    case 'document':
                        return {
                            icon: 'mdi-file-document-box',
                            value: filter
                        }
                    case 'status':
                        return {
                            icon: 'mdi-check-circle',
                            value: this.getStatusValue(filter)
                        }
                    case 'company':
                        return {
                            icon: 'mdi-store',
                            value: filter.nickname
                        }
                    case 'sender':
                        return {
                            icon: 'mdi-account',
                            value: filter.name
                        }
                    case 'between':
                        return {
                            icon: 'mdi-calendar-range',
                            value: this.getBetweenValue(filter)
                        }
                }
            },

            getStatusValue (status) {
                if (status == 2) {
                    return 'Pendente'
                } else if (status == '3,4') {
                    return 'Aberto'
                } else if (status == 5) {
                    return 'Vencido'
                } else if (status == 6) {
                    return 'Pausado'
                }
            },

            getBetweenValue (between) {
                const from = window.moment(between[0]).format('DD/MM/YYYY')
                const to = window.moment(between[1]).format('DD/MM/YYYY')

                return `${from} até ${to}`
            },

            getDate (date) {
                return moment(date, 'DD/MM/YYYY HH:mm').format('D MMM YYYY HH:mm')
            },
        },

        mounted () {
            this.$store.commit('reports/REPORT', this.report)
            this.$store.dispatch('reports/FETCH_ALL', this.report)
                .then(() => this.loading = false)
                .catch(() => this.loading = false)
        }
    }
</script>