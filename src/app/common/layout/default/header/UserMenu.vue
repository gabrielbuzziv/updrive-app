<template>
    <li class="user-menu">
        <dropdown right>
            <template slot="button">
                <div class="user-img">
                    <img :src="user.links.gravatar" class="img-responsive">
                </div>

                {{ user.name }}

                <i class="mdi mdi-chevron-down margin-left-10"></i>
            </template>

            <template slot="items">
                <div class="user-header">
                    <div class="user-img">
                        <img :src="user.links.gravatar" class="img-responsive">
                    </div>

                    <div class="user-info">
                        <span class="name">{{ user.name }}</span>
                        <small class="email">{{ user.email }}</small>
                    </div>
                </div>

                <div class="header">Configurações</div>

                <div class="item">
                    <route href="settings.profile">
                        <i class="mdi mdi-account-settings-variant margin-right-5"></i>
                        Meus dados
                    </route>
                </div>

                <div class="item" v-if="userCan('manage-core')">
                    <route href="settings.notifications">
                        <i class="mdi mdi-bell margin-right-5"></i>
                        Notificações
                    </route>
                </div>

                <!--<div class="item" v-if="userCan('manage-account')">-->
                    <!--<route href="settings.account">-->
                        <!--<i class="mdi mdi-key margin-right-5"></i>-->
                        <!--Detalhes da conta-->
                    <!--</route>-->
                <!--</div>-->

                <div class="item" v-if="userCan('manage-users')">
                    <route href="settings.members">
                        <i class="mdi mdi-account-multiple margin-right-5"></i>
                        Membros
                    </route>
                </div>

                <div class="divider"></div>

                <div class="item">
                    <a href="" @click.prevent="onLogout">
                        <i class="mdi mdi-power margin-right-5"></i>
                        Sair
                    </a>
                </div>
            </template>
        </dropdown>
    </li>
</template>

<script>
    export default {
        computed: {
            user () {
                return this.$store.getters['auth/GET_USER']
            }
        },

        methods: {
            onLogout () {
                this.$store.dispatch('auth/ON_LOGOUT')
                this.$router.push({ name: 'auth.login' })
            }
        }
    }
</script>