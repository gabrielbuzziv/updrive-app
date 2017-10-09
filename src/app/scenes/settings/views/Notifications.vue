<template>
    <page-load id="settings" class="notifications" :loading="loading">
        <div class="col-md-8 col-md-offset-2">
            <h2 class="section-title">Notificações</h2>

            <panel class="settings">
                <div class="notification">
                    <div class="content">
                        <h4>Documentos abertos</h4>
                        <p>Você será notificado quando um documento que você enviou for aberto.</p>
                    </div>
                    <el-switch v-model="document_opened"
                               on-color="#1aa71c"
                               on-text=""
                               off-text=""
                               @change="toggleNotification('document_opened')"/>
                </div>

                <div class="notification">
                    <div class="content">
                        <h4>Documento vencido</h4>
                        <p>Você será notificado quando algum dos documentos que você enviou vencer.</p>
                    </div>
                    <el-switch v-model="document_expired"
                               on-color="#1aa71c"
                               on-text=""
                               off-text=""
                               @change="toggleNotification('document_expired')"/>
                </div>

                <div class="notification">
                    <div class="content">
                        <h4>E-mail entregue</h4>
                        <p>Você será notificado quando seus e-mails enviados forem entregue.</p>
                    </div>
                    <el-switch v-model="email_delivered"
                               on-color="#1aa71c"
                               on-text=""
                               off-text=""
                               @change="toggleNotification('email_delivered')"/>
                </div>

                <div class="notification">
                    <div class="content">
                        <h4>E-mail aberto</h4>
                        <p>Você será notificado quando seus e-mails enviados forem aberto.</p>
                    </div>
                    <el-switch v-model="email_opened"
                               on-color="#1aa71c"
                               on-text=""
                               off-text=""
                               @change="toggleNotification('email_opened')"/>
                </div>
            </panel>
        </div>
    </page-load>
</template>

<script>
    import services from '../services'

    export default {
        data () {
            return {
                loading: true,
                notifications: [],
                document_opened: false,
                document_expired: false,
                email_delivered: false,
                email_opened: false,
            }
        },

        methods: {
            loadNotifications () {
                services.getNotificationSettings()
                    .then(response => {
                        this.notifications = response.data
                        this.document_opened = this.hasNotification('document_opened')
                        this.document_expired = this.hasNotification('document_expired')
                        this.email_delivered = this.hasNotification('email_delivered')
                        this.email_opened = this.hasNotification('email_opened')

                        this.loading = false
                    })
                    .catch(() => this.loading = false)
            },

            hasNotification (name) {
                return ! ! this.notifications.filter(notification => notification.notification == name).length
            },

            toggleNotification (notification) {
                services.toggleNotificationSettings(notification)
                    .then(response => {
                        this.loadNotifications()
                    })
            },
        },

        mounted () {
            this.loadNotifications()
        }
    }
</script>