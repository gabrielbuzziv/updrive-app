<template>
    <page-load id="reports">
        <div class="filters-fields">
            <form action="" ref="form" @submit.prevent="onSubmit">
                <div class="row">
                    <div class="form-group col-md-6">
                        <i class="mdi mdi-file-document-box icon margin-right-10"></i>
                        <input type="text" name="document" class="form-control field" placeholder="Documento">
                    </div>

                    <div class="form-group col-md-6">
                        <i class="mdi mdi-check-circle icon margin-right-10"></i>

                        <el-select
                                class="field"
                                popper-class="filters-popper"
                                placeholder="Status"
                                v-model="filters.status"
                                filterable
                                clearable
                                default-first-option>
                            <el-option v-for="stat in status" :value="stat.value" :label="stat.name"/>
                        </el-select>

                        <input type="hidden" name="status" :value="filters.status">
                    </div>

                    <div class="form-group col-md-6">
                        <i class="mdi mdi-store icon margin-right-10"></i>

                        <el-select
                                class="field"
                                popper-class="filters-popper"
                                placeholder="Empresa"
                                v-model="filters.company"
                                filterable
                                clearable
                                default-first-option>
                            <el-option v-for="company in companies" :value="company.id" :label="company.nickname"/>
                        </el-select>

                        <input type="hidden" name="company" :value="filters.company">
                    </div>

                    <div class="form-group col-md-6">
                        <i class="mdi mdi-account icon margin-right-10"></i>

                        <el-select
                                class="field"
                                popper-class="filters-popper"
                                placeholder="Remetente"
                                v-model="filters.sender"
                                filterable
                                clearable
                                default-first-option>
                            <el-option v-for="sender in senders" :value="sender.id" :label="sender.name"/>
                        </el-select>

                        <input type="hidden" name="sender" :value="filters.sender">
                    </div>

                    <div class="form-group col-md-12">
                        <i class="mdi mdi-calendar-today icon margin-right-10"></i>

                        <el-date-picker
                                class="block field"
                                popper-class="filter-date-picker"
                                v-model="filters.between"
                                type="daterange"
                                range-separator="até"
                                start-placeholder="Começa em"
                                end-placeholder="Termina em"
                                size="large"
                                format="dd/MM/yyyy">
                        </el-date-picker>

                    </div>
                </div>

                <button class="btn btn-primary margin-left-45">
                    <i class="mdi mdi-book-open-variant margin-right-5"></i>
                    Gerar Relatório
                </button>

                <button class="btn btn-blank">
                    Limpar Filtros
                </button>
            </form>
        </div>

        <panel class="margin-top-80">
            <report-list :report="1" />
        </panel>
    </page-load>
</template>

<script type="text/babel">
    import ReportList from './List'
    import services from '../services'

    export default {
        components: { ReportList },

        data () {
            return {
                documents: [],
                filters: {
                    document: null,
                    status: [],
                    company: [],
                    sender: [],
                    sent_from: null,
                    sent_to: null,
                    between: null
                },
                status: [
                    { value: [2], name: 'Pendente' },
                    { value: [3, 4], name: 'Aberto' },
                    { value: [5], name: 'Vencido' },
                ],
                companies: [],
                senders: []
            }
        },

        methods: {
            onSubmit () {
                const form = this.$refs.form

                services.submitReport(`reports/1`, new FormData(form))
                    .then(response => {
                        this.$router.push({ name: 'reports.status.result', params: { id: response.data.id } })
                    })
            }
        },

        mounted () {
            services.fetchCompanies()
                .then(response => this.companies = response.data.items)

            services.fetchSenders()
                .then(response => this.senders = response.data.items)
        }
    }
</script>