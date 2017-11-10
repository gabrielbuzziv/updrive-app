<template>
    <div id="options-list">
        <div class="row">
            <div class="col-md-6 col-sm-6">
                <div class="search">
                    <i class="mdi mdi-magnify"></i>
                    <input type="text"
                           class="form-control"
                           placeholder="Buscar"
                           v-model="query"
                           v-focus
                           @input="updateQuery">
                </div>
            </div>

            <div class="col-md-6 col-sm-6">
                <pagination namespace="updrive"/>

                <div class="filters margin-right-15">
                    <el-select v-model="status"
                               placeholder="Status"
                               class="margin-left-20"
                               clearable
                               @change="updateStatus">
                        <el-option v-for="status in statuses" :value="status.status" :label="status.name" :key="status.status"></el-option>
                    </el-select>
                </div>

                <div class="clearfix"></div>
            </div>

            <div class="clearfix"></div>
        </div>
    </div>
</template>

<script type="text/babel">
    import services from '../../services'
    import { debounce } from 'lodash'

    export default {
        data () {
            return {
                query: null,
                status: 0,
                statuses: [
                    { status: 'pending', name: 'Pendente' },
                    { status: 'opened', name: 'Aberto' },
                    { status: 'expired', name: 'Vencido' },
                ]
            }
        },

        methods: {
            updateQuery () {
                this.$store.dispatch('updrive/UPDATE_DOCUMENTS_QUERY', this.query)
            },

            updateStatus () {
                this.$store.dispatch('updrive/UPDATE_DOCUMENTS_STATUS', this.status)
            }
        },

        mounted () {
            this.query = this.$store.getters['updrive/GET_DOCUMENTS_QUERY']
            this.status = this.$store.getters['updrive/GET_DOCUMENTS_STATUS']
        }
    }
</script>