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
                    </span>
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
                return this.document.tracking && this.document.tracking.length
                    ? this.document.history.filter(history => history.action == 3 || history.action == 4 || history.action == 5).map(history => {
                        return {
                            action: history.action == 5 ? 'expired' : 'opened',
                            users: [history.user],
                            timegroup: this.removeMinuteFromData(history.created_at),
                            timestamp: history.created_at
                        }
                    })
                    : []
            },

            tracking () {
                return this.document.dispatch && this.document.dispatch.tracking
                    ? this.document.dispatch.tracking.filter(track => track.status == 'sent' || track.status == 'delivered')
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
                    case 'dropped':
                        return {
                            title: 'Falha',
                            color: 'danger'
                        }
                }
            },

            getDate (date) {
                return moment(date, 'DD/MM/YYYY HH:mm').format('D MMM YYYY HH:mm')
            },
        }
    }
</script>