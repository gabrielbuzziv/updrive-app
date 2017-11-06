<template>
    <page-load id="reports">
        <panel>
            <ul>
                <li v-for="filter, type in report.filters">{{ type }}: {{ filter }}</li>
            </ul>
        </panel>

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
                            <el-tooltip :content="contact.name" v-for="contact in document.sharedWith" :key="contact.id" placement="top">
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
                documents: [],
                report: {}
            }
        },

        mounted () {
            services.findReport(this.$route.params.id)
                .then(response => {
                    this.report = response.data
                    services.getStatusReport(this.report.id)
                        .then(response => {
                            this.documents = response.data.items
                        })
                })
        }
    }
</script>