<template>
    <table class="table">
        <thead>
            <tr>
                <th>Relatório</th>
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
                <td>{{ report.user.name }}</td>
                <td>{{ report.created_at }}</td>
                <td class="text-right">
                    <route href="reports.status.result" :params="{ id: report.id }" class="btn btn-default">
                        <i class="mdi mdi-magnify margin-right-5"></i>
                        Consultar
                    </route>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['report'],

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

        mounted () {
            this.$store.dispatch('reports/FETCH_ALL', this.report)
        }
    }
</script>