<template>
    <page-load :loading="loadingCompanies">
        <tab-content tab="general" active>
            <div class="row">
                <div class="form-group col-md-3">
                    <label>Nome</label>
                    <input type="text" class="form-control" name="name" v-model="data.name" v-focus>
                </div>

                <div class="form-group col-md-3">
                    <label class="required">E-mail</label>
                    <input type="text" class="form-control" name="email" v-model="data.email" required>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-6 margin-bottom-0">
                    <label>Empresas</label>
                    <el-select
                            v-model="contactCompanies"
                            placeholder="Buscar empresa"
                            class="fullsize remote"
                            filterable
                            multiple
                            default-first-option
                            no-match-text="Não encontramos essa empresa"
                            no-data-text="Empresa não encontrada"
                            ref="companies"
                            :filter-method="searchCompany"
                            @change="selectCompany">
                        <el-option v-for="company in companies" :key="company.id" :label="company.name" :value="company.id">
                            <span class="option-label">{{ company.name }}</span>
                            <span class="option-description" v-if="company.identifier">
                                {{ company.identifier }}
                            </span>
                        </el-option>
                    </el-select>

                    <input type="hidden" name="companies[]" :value="company" v-for="company in contactCompanies" key="companies" />
                </div>
            </div>
        </tab-content>

        <tab-content tab="phones">
            <div class="cloneable">
                <div class="row" v-for="(phone, index) in data.phones">
                    <div class="form-group col-md-4 col-sm-12">
                        <div class="input-group-with-select">
                            <input type="text" :name="`phones[${index}][number]`" class="form-control"
                                   placholder="Número"
                                   v-model="phone.number" v-mask="phoneMask(data.phone)">

                            <select :name="`phones[${index}][type]`" class="form-control" v-model="phone.type">
                                <option value="0">Empresarial</option>
                                <option value="1">Residencial</option>
                                <option value="2">Celular</option>
                                <option value="3">Fax</option>
                                <option value="4">Outro</option>
                            </select>
                        </div>

                        <a href="#" class="remove" @click.prevent="removePhone(phone)" v-if="index">
                            <i class="mdi mdi-delete"></i>
                        </a>
                    </div>
                </div>

                <a href="#" class="more" @click.prevent="addPhone">adicionar +</a>
            </div>
        </tab-content>

        <tab-content tab="address">
            <div class="row">
                <div class="form-group col-md-3">
                    <label>CEP</label>
                    <input type="text" class="form-control" name="postcode" v-model="data.address.postcode"
                           @keyup="searchAddress" v-mask="'#####-###'">
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-3">
                    <label>Logradouro</label>
                    <input type="text" class="form-control" name="street" v-model="data.address.street">
                </div>

                <div class="form-group col-md-3">
                    <label>Número</label>
                    <input type="text" class="form-control" name="number" v-model="data.address.number">
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-3">
                    <label>Complemento</label>
                    <input type="text" class="form-control" name="complement" v-model="data.address.complement">
                </div>

                <div class="form-group col-md-3">
                    <label>Bairro</label>
                    <input type="text" class="form-control" name="district" v-model="data.address.district">
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-3 margin-bottom-0">
                    <label>Cidade</label>
                    <input type="text" class="form-control" name="city" v-model="data.address.city">
                </div>

                <div class="form-group col-md-3 margin-bottom-0">
                    <label>Estado</label>
                    <input type="text" class="form-control" name="state" v-model="data.address.state">
                </div>
            </div>
        </tab-content>
    </page-load>
</template>

<script type="text/babel">
    import services from '../services'
    import { debounce } from 'lodash'

    export default {
        props: {
            data: Object
        },

        data () {
            return {
                loadingCompanies: true,
                cachedCompanies: [],
                contactCompanies: [],
                companies: [],
                contactFields: false,
                phoneFields: false,
                addressFields: false,
                saving: false
            }
        },

        watch: {
            data () {
                const data    = this.data
                const address = data.address

                if (data.companies) {
                    this.contactCompanies = data.companies.map((company) => company.id)
                }


                if (data.companies.length) {
                    this.contactFields = true
                }

                if (data.phones.length) {
                    this.phoneFields = true
                }

                if (address.postcode || address.street || address.number || address.complement || address.district || address.city || address.state) {
                    this.addressFields = true
                }
            }
        },

        methods: {
            addPhone () {
                this.data.phones.push({ number: '', type: 0 })
            },

            removePhone (value) {
                const phones     = this.data.phones
                this.data.phones = phones.filter(phone => phone !== value)
            },

            searchCompany: debounce(function (query) {
                const companies = this.cachedCompanies
                const name = companies.filter(company => company.name.toLowerCase().match(query.toLowerCase()))
                const customer = ! isNaN(query) ? companies.filter(company => company.identifier == query) : []
                const filter = name.concat(customer)

                this.companies = filter.filter((company, index, self) => {
                    return self.indexOf(company) === index
                })
            }, 300),

            selectCompany (companies) {
                this.$refs.companies.visible = false
            },

            searchAddress: debounce(function () {
                const cep = this.data.address.postcode.replace('/\D/g', '')

                services.searchAddress(cep)
                        .then(response => {
                            const address = response.data

                            this.data.address.street   = address.logradouro
                            this.data.address.district = address.bairro
                            this.data.address.city     = address.cidade
                            this.data.address.state    = address.estado
                        })
            }, 300)
        },

        mounted () {
            this.loadingCompanies = true
            this.cachedCompanies = []

            services.fetchCompanies()
                    .then(response => {
                        this.cachedCompanies = response.data.items
                        this.companies = this.cachedCompanies
                        this.loadingCompanies = false
                    })
                    .catch(() => {
                        this.loadingCompanies = false
                    })
        }
    }
</script>