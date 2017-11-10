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

                        <button class="btn btn-default btn-sm btn-rounded" v-if="item.action == 9">
                            <i class="mdi mdi-refresh margin-right-5"></i>
                            Reenviar
                        </button>
                    </span>

                    <p class="info" v-if="item.description">{{ item.description }}</p>
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
                    const similar = timeline.filter(line => line.action == value.action && line.timestamp == value.timestamp)
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
                            timestamp: history.created_at,
                            description: history.description
                        }
                    })
                    : []
            },

        },

        methods: {
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
                            title: 'E-mail aberto',
                            color: 'secondary'
                        }
                    case 9:
                        return {
                            title: 'Falha no Envio',
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