<template>
    <tbody>
        <tr :class="getStatus(track.status).color">
            <td class="tracking-email">
                <span class="column-value">
                    <i class="mdi margin-right-10" :class="getStatus(track.status).icon"></i>
                    <b>{{ getStatus(track.status).label }}</b>
                    {{ getStatus(track.status).ligation }}
                    {{ track.contact.email }}
                </span>
            </td>
            <td class="documents-date text-right">
                <span class="column-value">{{ track.created_at }}</span>
            </td>
            <td class="tracking-options text-right" width="100">
                <button class="btn btn-sm btn-rounded" @click="toggleDetails">
                    <i class="mdi mdi-chevron-down"></i>
                </button>
            </td>
        </tr>

        <tr class="details" v-if="details">
            <td colspan="5">
                <div class="row margin-bottom-20">
                    <div class="col-md-12">
                        <h3>
                            <i class="mdi margin-right-5" :class="getStatus(track.status).icon"></i>
                            E-mail {{ getStatus(track.status).label }}
                        </h3>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12 tracking-details">
                        <ul>
                            <li>
                                <b>Assunto</b>
                                <span>{{ track.dispatch.subject }}</span>
                            </li>

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
                                <b>{{ getStatus(track.status).label }} em</b>
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

        methods: {
            joinDocuments (documents) {
                return documents.map(document => document.name).join(', ')
            },

            getStatus (status) {
                switch (status) {
                    case 'sent':
                        return {
                            label: 'Enviado',
                            icon: 'mdi-email-outline',
                            color: 'success',
                            ligation: 'para'
                        }
                    case 'delivered':
                        return {
                            label: 'Entregue',
                            icon: 'mdi-email',
                            color: 'success',
                            ligation: 'para'
                        }
                    case 'opened':
                        return {
                            label: 'Aberto',
                            icon: 'mdi-email-open',
                            color: 'success',
                            ligation: 'por'
                        }
                }
            },

            toggleDetails () {
                this.details = ! this.details
            }
        }
    }
</script>
