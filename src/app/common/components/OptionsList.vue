<template>
    <div id="options-list">
        <div class="row">
            <div class="col-md-8 col-sm-6">
                <div class="search">
                    <i class="mdi mdi-magnify"></i>
                    <input type="text"
                           class="form-control"
                           placeholder="Buscar"
                           v-model="search"
                           @keydown="onSearch"
                           v-focus>
                </div>
            </div>

            <div class="col-md-4 col-sm-6">
                <pagination :namespace="namespace"/>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import { debounce } from 'lodash'

    export default {
        props: {
            namespace: String
        },

        data () {
            return {
                search: ''
            }
        },

        methods: {
            onSearch: debounce(function () {
                this.$store.dispatch('global/SET_FILTER', {
                    namespace: this.namespace,
                    value: this.search
                })
                this.$store.dispatch(`${this.namespace}/FETCH_ALL`)
            }, 300),
        },

        mounted () {
            this.search = this.$store.getters[`${this.namespace}/GET_FILTER`]
        }
    }
</script>
