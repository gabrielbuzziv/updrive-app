<template>
    <div>
        <div class="col-md-2 history-wrap" v-for="history in type">
            <div class="history">
                <div class="history-image">
                    <span>
                        <i class="mdi" :class="getStatus(history).icon"></i>
                    </span>
                </div>

                <div class="history-info">
                    <b>{{ getStatusUser(history) }}</b>
                    <span>
                        {{ getStatus(history).label }}
                        em {{ history.created_at }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: ['type'],

        methods: {
            getStatusUser (history) {
                return history.user ? history.user.name : 'Sistema'
            },

            getStatus (history) {
                const action = history.action

                switch (action) {
                    case 2:
                        return {
                            label: 'Enviou',
                            icon: 'mdi-send'
                        }
                    case 3:
                        return {
                            label: 'Baixou',
                            icon: 'mdi-download'
                        }
                    case 4:
                        return {
                            label: 'Visualizou',
                            icon: 'mdi-eye'
                        }
                    case 5:
                        return {
                            label: 'Venceu',
                            icon: 'mdi-calendar-remove'
                        }
                }
            }
        }
    }
</script>
