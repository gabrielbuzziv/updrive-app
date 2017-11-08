<template>
    <div class="timeline">
        <ul>
            <li :class="getAction(item.action).color" v-for="item in timeline">
                <span class="title">
                    {{ getAction(item.action).title }}
                </span>

                <span class="timestamp">
                    {{ getDate(item.timestamp) }}
                </span>

                <div class="description">
                    <span class="user" v-for="user in item.users">
                        {{ user ? user.email : 'Sistema' }}

                        <button class="btn btn-default btn-xs btn-rounded margin-left-20" v-if="item.action == 'failed'">
                            <i class="mdi mdi-refresh margin-right-5"></i>
                            Reenviar
                        </button>
                    </span>

                    <p class="failed" v-if="item.action == 'failed'">
                        Verifique se o e-mail do destintário está correto. Geralmente falhas no envio ocorrem pois o e-mail do destinatário não existe.
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['document'],

        computed: {
            timeline () {
                const timeline = this.tracking.concat(this.history)

                return timeline.map(value => {
                    const similar = timeline.filter(line => line.action == value.action && line.timegroup == value.timegroup)
                    const remove = similar.filter(sim => sim != value)

                    remove.forEach(r => {
                        const index = timeline.indexOf(r)
                        timeline.splice(index, 1)
                    })

                    value.users = [].concat.apply([], similar.map(sim => sim.users))
                    return value
                }).filter(value => value != null)
            },

            history () {
                return this.document && this.document.history
                    ? this.document.history.filter(history => history.action == 3 || history.action == 4 || history.action == 5 || history.action == 6)
                        .map(history => {
                            return {
                                action: this.getActionByCode(history.action),
                                users: [history.user],
                                timegroup: this.removeMinuteFromData(history.created_at),
                                timestamp: history.created_at
                            }
                        })
                    : []
            },

            tracking () {
                return this.document.dispatch && this.document.dispatch.tracking
                    ? this.document.dispatch.tracking.filter(track => track.status == 'sent' || track.status == 'delivered' || track.status == 'failed')
                        .map(track => {
                            return {
                                action: track.status,
                                users: [track.contact],
                                timegroup: this.removeMinuteFromData(track.created_at),
                                timestamp: track.created_at
                            }
                        })
                    : []
            },

        },

        methods: {
            removeMinuteFromData (timestamp) {
                return window.moment(timestamp, 'DD/MM/YYYY HH:mm').startOf('hour').format('DD/MM/YYYY HH:mm')
            },

            getActionByCode (code) {
                switch (code) {
                    case 3:
                    case 4:
                        return 'opened'
                    case 5:
                        return 'expired'
                    case 6:
                        return 'resent'
                }
            },

            getAction (action) {
                switch (action) {
                    case 'sent':
                        return {
                            title: 'Enviado',
                            color: 'warning'
                        }
                    case 'delivered':
                        return {
                            title: 'Entregue',
                            color: 'info'
                        }
                    case 'opened':
                        return {
                            title: 'Aberto',
                            color: 'success'
                        }
                    case 'expired':
                        return {
                            title: 'Vencido',
                            color: 'danger'
                        }
                    case 'failed':
                        return {
                            title: 'Envio falhou',
                            color: 'danger'
                        }
                    case 'resent':
                        return {
                            title: 'Reenviado',
                            color: 'warning'
                        }
                }
            },

            getDate (date) {
                return moment(date, 'DD/MM/YYYY HH:mm').format('D MMM YYYY HH:mm')
            },
        }
    }
</script>