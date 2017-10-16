<template>
    <page-load id="updrive">
        <page-load v-if="total">
            <page-header title="UP Drive">
                <template slot="children">
                    <el-select
                            v-model="company"
                            placeholder="Todas as empresas"
                            no-data-text="Ops, ainda não foram cadastradas empresas."
                            no-match-text="Ops, não encontramos a empresa que está procurando."
                            filterable
                            remote
                            clearable
                            default-first-option
                            :remote-method="filterCompanies">
                        <el-option v-for="company in companies" :value="company.id" :label="company.name"
                                   :key="company.id"/>
                    </el-select>
                </template>

                <template slot="right">
                    <button class="btn btn-secondary btn-rounded hidden-sm hidden-xs" @click="$root.$emit('open::composer')"
                            v-if="userCan('manage-core')">
                        <i class="mdi mdi-plus-circle margin-right-5"></i>
                        Enviar Documentos
                    </button>
                </template>

                <template slot="nav">
                    <!--<route href="updrive" tag="li" exact>-->
                        <!--<a>-->
                            <!--<i class="mdi mdi-clock margin-right-5"></i>-->
                            <!--Pendentes-->
                            <!--<span class="badge margin-left-10" v-if="amounts.pendings">{{ amounts.pendings }}</span>-->
                        <!--</a>-->
                    <!--</route>-->

                    <route href="updrive.documents" tag="li">
                        <a>
                            <i class="mdi mdi-archive margin-right-5"></i>
                            Documentos
                            <span class="badge margin-left-10" v-if="amounts.documents">{{ amounts.documents }}</span>
                        </a>
                    </route>

                    <route href="updrive.emails" tag="li">
                        <a>
                            <i class="mdi mdi-target margin-right-5"></i>
                            Rastreamento
                            <span class="badge margin-left-10">
                                BETA
                            </span>
                        </a>
                    </route>
                </template>
            </page-header>

            <page-content>
                <button class="btn btn-secondary btn-block margin-bottom-20 hidden-md hidden-lg"
                        @click="$root.$emit('open::composer')" v-if="userCan('manage-core')">
                    <i class="mdi mdi-plus-circle margin-right-5"></i>
                    Enviar Documentos
                </button>

                <router-view></router-view>
            </page-content>
        </page-load>

        <page-load v-if="! total && ! loading">
            <page-content>
                <first-time title="UP Drive" icon="file-multiple"
                            :advantages="['Envie os documentos de maneira simples.', 'Seu cliente não precisará acessar a ferramenta para baixar os documentos.', 'Saiba se o seu cliente já recebeu os documentos.']">
                    <template slot="buttons">
                        <button class="btn btn-secondary btn-rounded" @click="$root.$emit('open::composer')"
                                v-if="userCan('manage-core')">
                            <i class="mdi mdi-plus-circle margin-right-5"></i>
                            Enviar documentos
                        </button>
                    </template>
                </first-time>
            </page-content>
        </page-load>
    </page-load>
</template>

<script type="text/babel">
    import services from './services'
    import { debounce } from 'lodash'

    export default {

        data () {
            return {
                total: 0,
                loading: true,
                companies: [],
                cachedCompanies: []
            }
        },

        computed: {
            company: {
                get () {
                    return this.$store.getters['updrive/GET_COMPANY']
                },

                set (value) {
                    this.$store.commit('updrive/PAGE', 1)
                    this.$store.commit('updrive/COMPANY', value)
                    this.$store.dispatch('updrive/GET_AMOUNTS')
//                    this.$store.dispatch('updrive/FETCH_PENDINGS')
                    this.$store.dispatch('updrive/FETCH_ALL')
                }
            },

            amounts () {
                return this.$store.getters['updrive/GET_AMOUNTS']
            }
        },

        methods: {
            load () {
                services.getTotal()
                        .then(response => {
                            this.total = response.data.total

                            if (this.total) {
                                services.getCompanies()
                                        .then(response => {
                                            this.companies = response.data.items
                                            this.cachedCompanies = this.companies
                                            this.loading   = false
                                        })
                                        .catch(() => this.loading = false)
                            } else {
                                this.loading = false
                            }
                        })
                        .catch(() => this.loading = false)
            },

            filterCompanies: debounce (function (query) {
                console.log(query)

                if (query.length) {
                    services.getCompanies(query)
                        .then(response => {
                            this.companies = response.data.items
                        })
                } else {
                    this.companies = this.cachedCompanies
                }
            }, 300)
        },

        mounted () {
            this.load()
            this.$root.$on('load::companies', () => this.load())

            if (this.$route.query && this.$route.query.empresas == 'todas') {
                this.company = ''
            }

        },

        beforeDestroy () {
            this.$root.$off('load::companies')
        }
    }
</script>
