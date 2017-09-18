<template>
    <page-load>
        <tab-content tab="general" active>
            <div class="row">
                <div class="form-group col-md-3">
                    <label class="required">Razão Social</label>
                    <input type="text" class="form-control" name="name" v-model="data.name" required v-focus>
                </div>

                <div class="form-group col-md-3">
                    <label>Nome Fantasia</label>
                    <input type="text" class="form-control" name="nickname" v-model="data.nickname"
                           :placeholder="data.name">
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-3">
                    <label>Código da Empresa</label>
                    <input type="text" class="form-control" name="identifier" v-model="data.identifier">
                    <small class="helper-block">
                        Código único da empresa, utilizado para filtrar as empresas.
                    </small>
                </div>

                <div class="form-group col-md-3">
                    <label>E-mail</label>
                    <input type="text" class="form-control" name="email" v-model="data.email">
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-3">
                    <label>Telefone</label>
                    <input type="text" class="form-control" name="phone" v-model="data.phone" v-mask="phoneMask(data.phone)">
                </div>

                <div class="form-group col-md-3">
                    <label>CNPJ</label>
                    <input type="text" class="form-control" name="taxvat" v-model="data.taxvat" v-mask="'##.###.###/####-##'">
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-3 margin-bottom-0">
                    <label>Inscrição Estadual / RG</label>
                    <input type="text" class="form-control" name="docnumber" v-model="data.docnumber">
                </div>

                <div class="form-group col-md-3 margin-bottom-0">
                    <label>Inscrição Municipal</label>
                    <input type="text" class="form-control" name="docnumber_town" v-model="data.docnumber_town">
                </div>
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
                companyFields: false,
                addressFields: false
            }
        },

        watch: {
            data () {
                const data = this.data
                const address = data.address

                if (data.identifier || data.email || data.phone || data.taxvat || data.docnumber || data.docnumber_town) {
                    this.companyFields = true
                }

                if (address.postcode || address.street || address.number || address.complement || address.district || address.city || address.state) {
                    this.addressFields = true
                }
            }
        },

        methods: {
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
        }
    }
</script>
