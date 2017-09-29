<template>
    <div class="document-history">
        <timeline-horizontal :items="items"/>
    </div>
</template>

<script type="text/babel">
    export default {
        props: ['document'],

        computed: {
            items () {
                if (this.document && this.document.history) {
                    return this.document.history.map(history => {
                        return {
                            author: this.getUser(history),
                            date: history.created_at,
                            event: this.getStatus(history),
                            complete: true
                        }
                    })
                }

                return null
            }
        },

        methods: {
            getUser (history) {
                return history.user ? history.user.name : 'Sistema'
            },

            getStatus (history) {
                const action = history.action

                switch (action) {
                    case 2:
                        return 'Enviou o documento'
                    case 3:
                        return 'Baixou o documento'
                    case 4:
                        return 'Visualizou o documento'
                    case 5:
                        return 'Vencimento expirou'
                }
            }
        },
    }
</script>