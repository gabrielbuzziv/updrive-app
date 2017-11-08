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
                const timeline = this.history

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
                    ? this.document.history.map(history => {
                        return {
                            action: history.action,
                            users: [history.user],
                            timegroup: this.removeMinuteFromData(history.created_at),
                            timestamp: history.created_at
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
                    case 2:
                        return {
                            title: 'Enviado',
                            color: 'warning'
                        }
                    case 3:
                    case 4:
                        return {
                            title: 'Aberto',
                            color: 'success'
                        }
                    case 5:
                        return {
                            title: 'Vencido',
                            color: 'danger'
                        }
                    case 6:
                        return {
                            title: 'Reenviado',
                            color: 'warning'
                        }
                    case 7:
                        return {
                            title: 'Entregue',
                            color: 'info'
                        }
                    case 8:
                        return {
                            title: 'Lido',
                            color: 'info'
                        }
                    case 9:
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