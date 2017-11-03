<template>
    <page-load>
        <panel class="blank filter-options">
            <div class="row margin-bottom-20">
                <div class="col-lg-4 col-md-6">
                    <input type="text" class="form-control" v-model="filters.document" placeholder="Documento"
                           @keydown="filterDocument">
                </div>

                <div class="col-lg-4 col-md-6">
                    <el-select class="block"
                               v-model="filters.status"
                               placeholder="Status"
                               clearable
                               default-first-option
                               @change="load">
                        <el-option v-for="stat in status" :value="stat.value" :label="stat.name"></el-option>
                    </el-select>
                </div>
            </div>

            <div class="row margin-bottom-20">
                <div class="col-lg-4 col-md-6">
                    <el-select class="block"
                               v-model="filters.company"
                               placeholder="Empresas"
                               no-match-text="Não encontramos empresas"
                               no-data-text="Não encontramos empresas"
                               filterable
                               clearable
                               default-first-option
                               @change="load">
                        <el-option v-for="company in companies" :value="company.id"
                                   :label="company.nickname"></el-option>
                    </el-select>
                </div>

                <div class="col-lg-4 col-md-6">
                    <el-select class="block"
                               v-model="filters.sender"
                               placeholder="Remetente"
                               no-match-text="Não encontramos remetentes"
                               no-data-text="Não encontramos remetentes"
                               filterable
                               clearable
                               default-first-option
                               @change="load">
                        <el-option v-for="sender in senders" :value="sender.id"
                                   :label="sender.name"></el-option>
                    </el-select>
                </div>
            </div>
        </panel>

        <panel>
            <page-load>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Empresa</th>
                            <th>De <i class="mdi mdi-arrow-right"></i> Para</th>
                            <th>Data de Envio</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="document in documents" :key="document.id">
                            <td>{{ document.name }}</td>
                            <td>{{ document.company.name }}</td>
                            <td>
                                <span class="from">Geane</span>
                                <i class="mdi mdi-arrow-right"></i>
                                <span class="to">
                                    <span>John Doe</span>
                                    <span>John Smith</span>
                                </span>
                            </td>
                            <td>{{ document.created_at }}</td>
                            <td>
                                <div class="label" :class="document.status.label">
                                    {{ document.status.name }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </page-load>
        </panel>
    </page-load>
</template>

<script type="text/babel">
    import services from '../services'
    import { debounce } from 'lodash'

    export default {
        data () {
            return {
                documents: [],
                filters: {
                    document: null,
                    status: null,
                    company: null,
                    sender: null,
                    sent_from: null,
                    sent_to: null
                },
                status: [
                    { value: [2], name: 'Pendente' },
                    { value: [3,4], name: 'Aberto' },
                    { value: [5], name: 'Vencido' },
                ],
                companies: [],
                senders: []
            }
        },

        computed: {
            //
        },

        methods: {
            load () {
                services.fetchReportSent(this.filters)
                    .then(response => this.documents = response.data)
            },

            loadCompanies () {
                services.fetchCompanies()
                    .then(response => this.companies = response.data.items)
            },

            loadSenders () {
                services.fetchSenders()
                    .then(response => this.senders = response.data.items)
            },

            filterDocument: debounce(function () {
                this.load()
            }, 300),
        },

        mounted () {
            this.loadCompanies()
            this.loadSenders()
            this.load()
        }
    }
</script>