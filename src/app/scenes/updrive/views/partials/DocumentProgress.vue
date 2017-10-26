<template>
    <div class="row document-progress" :class="progressColor" style="border-bottom:0;">
        <div class="col-xs-4 step" :class="sentStatus">
            <div class="progress">
                <div class="progress-bar"></div>
            </div>
            <a href="#" class="dot">
                <el-tooltip placement="top">
                    <template slot="content">
                        Enviado por {{ document.user.name }} em {{ document.created_at }}
                    </template>

                    <span class="info">
                        <i class="mdi mdi-email"></i>
                        <span class="name">
                            Enviado
                            <span class="triangle"></span>
                        </span>
                    </span>
                </el-tooltip>
            </a>
        </div>

        <div class="col-xs-4 step" :class="deliveredStatus">
            <div class="progress">
                <div class="progress-bar"></div>
            </div>
            <a href="#" class="dot">
                <el-tooltip placement="top">
                    <template slot="content">
                        <span class="block" :class="{ 'margin-bottom-5': index < delivered.length - 1 }"
                              v-for="tracking, index in delivered">
                            Documento entregue para <b>{{ tracking.contact.name }}</b> em {{ tracking.created_at }}
                        </span>
                    </template>

                    <span class="info">
                        <i class="mdi mdi-mailbox"></i>
                        <span class="name">
                            Entregue
                            <span class="triangle"></span>
                        </span>
                    </span>
                </el-tooltip>
            </a>
        </div>

        <div class="col-xs-4 step opened" :class="openedStatus" v-if="! expired.length">
            <div class="progress">
                <div class="progress-bar"></div>
            </div>
            <a href="#" class="dot">
                <el-tooltip placement="top">
                    <template slot="content">
                        <span class="block" :class="{ 'margin-bottom-5': index < opened.length - 1 }"
                              v-for="history, index in opened">
                            {{ getActionLabel(history.action) }} em {{ history.created_at
                            }} por {{ getHistoryUser(history) }}
                        </span>
                    </template>

                    <span class="info">
                        <i class="mdi mdi-check-circle"></i>
                        <span class="name">
                            Aberto
                            <span class="triangle"></span>
                        </span>
                    </span>
                </el-tooltip>
            </a>
        </div>

        <div class="col-xs-4 step" :class="expiredStatus" v-else>
            <div class="progress">
                <div class="progress-bar"></div>
            </div>
            <a href="#" class="dot">
                <el-tooltip placement="top">
                    <template slot="content">
                        <span class="block" :class="{ 'margin-bottom-5': index < expired.length - 1 }"
                              v-for="history, index in expired">
                            {{ getActionLabel(history.action) }} em {{ history.created_at
                            }} por {{ getHistoryUser(history) }}
                        </span>
                    </template>
                    <span class="info">
                        <i class="mdi mdi-close-circle"></i>
                        <span class="name">
                            Vencido
                            <span class="triangle"></span>
                        </span>
                    </span>
                </el-tooltip>
            </a>
        </div>
    </div>
</template>

<script>
    import { isEqual } from 'lodash'

    export default {
        props: ['document'],

        computed: {
            sent () {
                return this.document.history.filter(history => history.action == 2)
            },

            delivered () {
                return this.document.dispatch && this.document.dispatch.tracking
                    ? this.document.dispatch.tracking.filter(tracking => tracking.status == 'delivered')
                    : []
            },

            opened () {
                return this.document.history.filter(history => history.action == 3 || history.action == 4)
            },

            expired () {
                return this.document.history.filter(history => history.action == 5)
            },

            sentStatus () {
                return this.opened.length || this.expired.length ? 'complete' : this.delivered.length ? 'complete' : 'active'
            },

            deliveredStatus () {
                return this.opened.length || this.expired.length ? 'complete' : this.delivered.length ? 'active' : 'disabled'
            },

            openedStatus () {
                return this.opened.length ? 'active' : 'disabled'
            },

            expiredStatus () {
                return this.expired.length ? 'active' : 'disabled'
            },

            progressColor () {
                if (this.expiredStatus == 'active') {
                    return 'danger'
                } else if (this.openedStatus == 'active') {
                    return 'success'
                } else if (this.deliveredStatus == 'active') {
                    return 'primary'
                } else {
                    return 'warning'
                }
            }
        },

        methods: {
            getActionLabel (action) {
                const labels = ['', 'Enviado', 'Baixado', 'Visualizado', 'Vencido']
                return labels[action - 1]
            },

            getHistoryUser (history) {
                if (history.user) {
                    return history.user.name
                }

                return 'Sistema'
            }
        }
    }
</script>