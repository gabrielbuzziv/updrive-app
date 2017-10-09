<template>
    <li class="notifications">
        <dropdown right @open="readNotifications()">
            <template slot="button">
                <div class="notify" v-if="hasNotifications">
                    <span class="heartbit"></span>
                    <span class="point"></span>
                </div>
                <i class="mdi mdi-bell"></i>
            </template>

            <template slot="items">
                <div class="item header">
                    <span>Notificações</span>

                    <el-tooltip content="Configurações de notificação" placement="bottom-end">
                        <route href="settings.notifications">
                            <i class="mdi mdi-settings"></i>
                        </route>
                    </el-tooltip>
                </div>

                <div class="notifications-items" v-if="user.notifications.length">
                    <div class="item notification" v-for="notification in user.notifications">
                        <document-opened :data="notification.data" v-if="isDocumentOpened(notification)"/>
                        <email-delivered :data="notification.data" v-if="isEmailDelivered(notification)"/>
                    </div>
                </div>

                <div class="notifications-empty" v-else>
                    <h4>Sem novas notificações</h4>
                    <p>As notificações são exibidas de acordo com as suas <route href="settings.notifications">configurações de notificação</route>.</p>
                </div>
            </template>
        </dropdown>
    </li>
</template>

<script>
    import DocumentOpened from './notifications/DocumentOpened'
    import EmailDelivered from './notifications/EmailDelivered'
    import Helper from 'common/Helper'

    export default {
        components: { DocumentOpened, EmailDelivered },

        data () {
            return {
                hasNotifications: false
            }
        },

        computed: {
            user () {
                return this.$store.getters['auth/GET_USER']
            }
        },

        methods: {
            isDocumentOpened (notification) {
                return notification.type == 'DocumentOpened'
            },

            isEmailDelivered (notification) {
                return notification.type == 'EmailDelivered'
            },

            readNotifications () {
                window.axios.post('notifications/read')
                    .then(() => this.hasNotifications = false)
            },

            notify (notification) {
                switch (notification.type) {
                    case 'DocumentOpened':
                        this.$notify({
                            title: 'Documento aberto',
                            message: `${notification.data.contact.name} abriu o documento ${notification.data.document.name}`,
                            offset: 50
                        })
                        break
                }
            }
        },

        mounted () {
            this.$root.$on('notifications::user', notifications => this.hasNotifications = notifications)

            window.socket.on('notifications:App\\Events\\DocumentOpened', (response) => {
                if (response.account == Helper.getAccount()) {
                    if (this.user.id == response.data.user.id) {
                        this.$store.dispatch('auth/FETCH_USER')
                            .then(() => this.hasNotifications = true)

                        this.notify(response)
                    }
                }
            })
        },

        beforeDestroy () {
            this.$root.$off('notifications::user')
        }
    }
</script>