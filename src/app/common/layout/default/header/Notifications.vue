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
                <div class="item header">Notificações</div>

                <div class="notifications-items">
                    <div class="item notification" v-for="notification in user.notifications">
                        <document-opened :data="notification.data" v-if="isDocumentOpened(notification)"/>
                        <email-delivered :data="notification.data" v-if="isEmailDelivered(notification)"/>
                    </div>
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
            }
        },

        mounted () {
            this.$root.$on('notifications::user', notifications => this.hasNotifications = notifications)

            window.socket.on('notifications:App\\Events\\DocumentOpened', (response) => {
                if (response.account == Helper.getAccount()) {
                    if (this.user.id == response.data.user.id) {
                        this.$store.dispatch('auth/FETCH_USER')
                            .then(() => this.hasNotifications = true)
                    }
                }
            })
        },

        beforeDestroy () {
            this.$root.$off('notifications::user')
        }
    }
</script>