<template>
    <tbody>
        <tr :class="status.color" @click="toggleDetails">
            <td>
                <span class="column-label">Remetente</span>
                <span class="column-value">{{ track.dispatch.user.email }}</span>
            </td>

            <td>
                <div class="column-label">Para</div>
                <div class="column-value">{{ track.contact.email }}</div>
            </td>

            <td>
                <div class="column-label">Assunto</div>
                <div class="column-value">
                    <el-tooltip :content="`Documentos anexados: ${joinDocuments(track.dispatch.documents)}`" placement="top">
                        <i class="mdi mdi-paperclip margin-right-5"></i>
                    </el-tooltip>

                    {{ track.dispatch.subject }}
                </div>
            </td>

            <td>
                <div class="column-label">Enviado em</div>
                <div class="column-value">{{ track.dispatch.created_at }}</div>
            </td>

            <td class="tracking-email">
                <span class="column-label">Status</span>
                <span class="column-value">
                    <i class="mdi margin-right-5" :class="status.icon"></i>
                    {{ status.label }}
                </span>
            </td>

            <td class="tracking-options text-right" width="100">
                <span class="btn btn-sm btn-rounded">
                    <i class="mdi mdi-chevron-up" v-if="details"></i>
                    <i class="mdi mdi-chevron-down" v-else></i>
                </span>
            </td>
        </tr>

        <tr class="details" v-if="details">
            <td colspan="6">
                <div class="row margin-bottom-20">
                    <div class="col-md-12">
                        <h3>
                            {{ track.dispatch.subject }}
                        </h3>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12 tracking-details">
                        <ul>
                            <li>
                                <b>Empresa</b>
                                <span>{{ track.dispatch.company.name }}</span>
                            </li>

                            <li>
                                <b>Documentos</b>
                                <span>{{ joinDocuments(track.dispatch.documents) }}</span>
                            </li>

                            <li>
                                <b>Remetente</b>
                                <span>{{ track.dispatch.user.name }}</span>
                            </li>

                            <li>
                                <b>{{ status.label }} em</b>
                                <span>{{ track.created_at }}</span>
                            </li>

                            <li class="full" v-if="track.dispatch.message">
                                <b>Mensagem</b>
                                <span>{{ track.dispatch.message }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script type="text/babel">
    import { pluck } from 'lodash'

    export default {
        props: ['track'],

        data () {
            return {
                details: false
            }
        },

        computed: {
            status () {
                if (this.track && this.track.status) {
                    switch (this.track.status) {
                        case 'sent':
                            return {
                                label: 'Enviado',
                                icon: 'mdi-check',
                                color: 'info',
                            }
                        case 'delivered':
                            return {
                                label: 'Entregue',
                                icon: 'mdi-email-outline',
                                color: 'success',
                            }
                        case 'opened':
                            return {
                                label: 'Aberto',
                                icon: 'mdi-email-open-outline',
                                color: 'success',
                            }
                        case 'spam':
                            return {
                                label: 'SPAM',
                                icon: 'mdi-block-helper',
                                color: 'warning',
                            }
                        case 'bounce':
                            return {
                                label: 'Falhou',
                                icon: 'mdi-email-alert',
                                color: 'danger',
                            }
                    }
                }

                return {}
            }
        },

        methods: {
            joinDocuments (documents) {
                return documents.map(document => document.name).join(', ')
            },

            toggleDetails () {
                this.details = ! this.details
            },
        }
    }
</script>
