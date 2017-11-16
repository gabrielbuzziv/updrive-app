<template>
    <page-load id="reports">
        <div class="filters-fields">
            <form action="" ref="form" @submit.prevent="onSubmit">
                <div class="row">
                    <div class="form-group col-md-6">
                        <i class="mdi mdi-file-document-box icon margin-right-10"></i>
                        <input type="text" name="document" class="form-control field" placeholder="Documento"
                               v-model="filters.document">
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
                            <el-option v-for="stat, index in status" :value="stat.value" :label="stat.name"
                                       :key="index"/>
                        </el-select>
                    </div>

                    <div class="form-group col-md-6">
                        <i class="mdi mdi-store icon margin-right-10"></i>

                        <el-select
                                class="field"
                                popper-class="filters-popper"
                                placeholder="Empresa"
                                v-model="filters.company"
                                value-key="id"
                                filterable
                                clearable
                                default-first-option>
                            <el-option v-for="company in companies" :value="company" :label="company.nickname"
                                       :key="company.id"/>
                        </el-select>
                    </div>

                    <div class="form-group col-md-6">
                        <i class="mdi mdi-account icon margin-right-10"></i>

                        <el-select
                                class="field"
                                popper-class="filters-popper"
                                placeholder="Remetente"
                                v-model="filters.sender"
                                value-key="id"
                                filterable
                                clearable
                                default-first-option>
                            <el-option v-for="sender in senders" :value="sender" :label="sender.name" :key="sender.id"/>
                        </el-select>
                    </div>

                    <div class="form-group col-lg-6 col-md-12">
                        <i class="mdi mdi-calendar-today icon margin-right-10"></i>

                        <el-date-picker
                                :editable="false"
                                v-model="filters.between"
                                class="field"
                                type="daterange"
                                placeholder="Intervalo de envio"
                                range-separator=" até "
                                format="dd 'de' MMMM 'de' yyyy">
                        </el-date-picker>
                    </div>
                </div>

                <button class="btn btn-primary margin-left-45">
                    <i class="mdi mdi-book-open-variant margin-right-5"></i>
                    Gerar Relatório
                </button>

                <button class="btn btn-blank" @click.prevent="resetFilters">
                    Limpar Filtros
                </button>
            </form>
        </div>

        <pagination namespace="reports"></pagination>
        <panel class="margin-top-80">
            <report-list :report="1"/>
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
                    between: null
                },
                status: [
                    { value: [2], name: 'Pendente' },
                    { value: [3, 4], name: 'Aberto' },
                    { value: [5], name: 'Vencido' },
                    { value: [6], name: 'Pausado' },
                ],
                companies: [],
                senders: []
            }
        },

        methods: {
            onSubmit () {
                const form = this.$refs.form

                services.submitReport(`reports/1`, this.filters)
                    .then(response => {
                        this.$router.push({ name: 'reports.status.result', params: { id: response.data.id } })
                    })
            },

            resetFilters () {
                this.filters = {
                    document: null,
                    status: [],
                    company: [],
                    sender: [],
                    between: null
                }
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