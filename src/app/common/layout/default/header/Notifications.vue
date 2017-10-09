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
                        <document-expired :data="notification.data" v-if="isDocumentExpired(notification)"/>
                        <email-delivered :data="notification.data" v-if="isEmailDelivered(notification)"/>
                        <email-opened :data="notification.data" v-if="isEmailOpened(notification)"/>
                    </div>
                </div>

                <div class="notifications-empty" v-else>
                    <h4>Sem novas notificações</h4>
                    <p>As notificações são exibidas de acordo com as suas
                        <route href="settings.notifications">configurações de notificação</route>.
                    </p>
                </div>
            </template>
        </dropdown>
    </li>
</template>

<script>
    import DocumentOpened from './notifications/DocumentOpened'
    import DocumentExpired from './notifications/DocumentExpired'
    import EmailDelivered from './notifications/EmailDelivered'
    import EmailOpened from './notifications/EmailOpened'
    import Helper from 'common/Helper'

    export default {
        components: { DocumentOpened, DocumentExpired, EmailDelivered, EmailOpened },

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

            isDocumentExpired (notification) {
                return notification.type == 'DocumentExpired'
            },

            isEmailDelivered (notification) {
                return notification.type == 'EmailDelivered'
            },

            isEmailOpened (notification) {
                return notification.type == 'EmailOpened'
            },

            readNotifications () {
                window.axios.post('notifications/read')
                    .then(() => this.hasNotifications = false)
            },

            isValidNotification (notification) {
                if (notification.account == Helper.getAccount() && this.user.id == notification.data.user.id) {
                    return this.$store.dispatch('auth/FETCH_USER')
                        .then(() => {
                            this.hasNotifications = true
                            return true
                        })
                }

                return false
            }
        },

        mounted () {
            this.$root.$on('notifications::user', notifications => this.hasNotifications = notifications)

            window.socket.on('notifications:App\\Events\\DocumentOpened', (response) => {
                if (this.isValidNotification(response)) {
                    this.$notify({
                        title: 'Documento aberto',
                        message: `${response.data.contact.name} abriu o documento ${response.data.document.name}.`,
                        offset: 50
                    })
                }
            })

            window.socket.on('notifications:App\\Events\\DocumentExpired', (response) => {
                if (this.isValidNotification(response)) {
                    this.$notify({
                        title: 'Documento(s) expirados',
                        message: `Alguns documentos não foram abertos até a data de vencimento.`,
                        offset: 50
                    })
                }
            })

            window.socket.on('notifications:App\\Events\\EmailDelivered', (response) => {
                if (this.isValidNotification(response)) {
                    this.$notify({
                        title: 'E-mail entregue',
                        message: `O e-mail "${response.data.subject}" foi entregue para ${response.data.contact.email}.`,
                        offset: 50
                    })
                }
            })

            window.socket.on('notifications:App\\Events\\EmailOpened', (response) => {
                if (this.isValidNotification(response)) {
                    this.$notify({
                        title: 'E-mail aberto',
                        message: `${response.data.contact.email} abriu o e-mail "${response.data.subject}".`,
                        offset: 50
                    })
                }
            })
        },

        beforeDestroy () {
            this.$root.$off('notifications::user')
        }
    }
</script>