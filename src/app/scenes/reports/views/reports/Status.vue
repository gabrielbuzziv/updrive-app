<template>
    <page-load :loading="loading" id="reports">
        <panel class="panel-filters" v-if="report.filters && report.filters.length">
            <ul class="filters">
                <li class="filter col-md-4" v-for="filter, index in report.filters" v-if="isValidFilter(filter)">
                    <i class="mdi margin-right-15" :class="getFilter(filter, index).icon"></i>
                    <span class="info">
                        <b>{{ getFilterTitle(index) }}</b>
                        <span>{{ getFilter(filter, index).value }}</span>
                    </span>
                </li>
            </ul>
        </panel>

        <div class="result-topbar">
            <div class="links">
                <route href="reports.status" class="btn btn-default" exact>
                    <i class="mdi mdi-arrow-left margin-right-5"></i>
                    Voltar
                </route>
            </div>

            <pagination namespace="results"></pagination>

            <div class="clearfix"></div>
        </div>

        <panel>
            <table class="table table-result">
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th class="text-center">Remetente</th>
                        <th class="text-center">Destinatário</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Enviado em</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="document in documents" :key="document.id">
                        <td class="document">
                            <b>{{ document.name }}</b>
                            <small>Empresa {{ document.company.nickname }}</small>
                        </td>
                        <td class="text-center user">
                            <el-tooltip :content="document.user.name" placement="top">
                                <img :src="document.user.links.gravatar" class="img-circle">
                            </el-tooltip>
                        </td>
                        <td class="text-center user">
                            <el-tooltip :content="contact.name" v-for="contact in document.sharedWith" :key="contact.id"
                                        placement="top">
                                <img :src="contact.links.gravatar" class="img-circle">
                            </el-tooltip>
                        </td>
                        <td class="text-center">
                            <div class="label" :class="document.status.label">{{ document.status.name }}</div>
                        </td>
                        <td class="text-center">{{ document.created_at }}</td>
                    </tr>
                </tbody>
            </table>
        </panel>
    </page-load>
</template>

<script>
    import services from '../../services'

    export default {
        data () {
            return {
                report: {},
                loading: true
            }
        },

        computed: {
            documents () {
                return this.$store.getters['results/GET_RESULTS']
            }
        },

        methods: {
            isValidFilter (filter) {
                return filter != null && filter != ''
            },

            getFilterTitle (index) {
                switch (index) {
                    case 'document':
                        return 'Documento'
                    case 'company':
                        return 'Empresa'
                    case 'sender':
                        return 'Remetente'
                    case 'status':
                        return 'Status'
                    case 'between':
                        return 'Periodo de Envio'
                }
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
                }
            },

            getBetweenValue (between) {
                const from = window.moment(between[0]).format('DD/MM/YYYY')
                const to = window.moment(between[1]).format('DD/MM/YYYY')

                return `${from} até ${to}`
            }
        },

        mounted () {
            services.findReport(this.$route.params.id)
                .then(response => {
                    this.report = response.data

                    this.$store.commit('results/REPORT', 1)
                    this.$store.commit('results/RESULT', this.report.id)
                    this.$store.dispatch('results/FETCH_ALL')
                        .then(() => this.loading = false)
                        .catch(() => this.loading = false)
                })
        }
    }
</script>