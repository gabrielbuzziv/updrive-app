<template>
    <page-load>
        <page-header title="Configurações">
            <template slot="nav">
                <route href="settings.profile" tag="li">
                    <a href="#">
                        <i class="mdi mdi-account-settings-variant margin-right-5"></i>
                        Meus dados
                    </a>
                </route>

                <!--<route href="settings.account" tag="li" v-if="userCan('manage-account')">-->
                    <!--<a href="#">-->
                        <!--<i class="mdi mdi-key margin-right-5"></i>-->
                        <!--Detalhes da conta-->
                    <!--</a>-->
                <!--</route>-->

                <route href="settings.notifications" tag="li">
                    <a href="#">
                        <i class="mdi mdi-bell margin-right-5"></i>
                        Notificações
                    </a>
                </route>

                <route href="settings.members" tag="li" v-if="userCan('manage-users')">
                    <a href="#">
                        <i class="mdi mdi-account-multiple margin-right-5"></i>
                        Membros
                    </a>
                </route>
            </template>
        </page-header>

        <page-content>
            <router-view></router-view>
        </page-content>
    </page-load>
</template>