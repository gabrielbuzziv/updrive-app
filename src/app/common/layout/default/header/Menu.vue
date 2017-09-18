<template>
    <div class="header-menu">
        <ul class="nav menu">
            <li class="margin-right-20">
                <button class="btn btn-primary-dark btn-rounded btn-sm" @click.prevent="$root.$emit('send::documents')">
                    <i class="mdi mdi-plus-circle margin-right-5"></i>
                    Enviar documentos
                </button>
            </li>

            <li class="user-menu">
                <dropdown right>
                    <template slot="button">
                        <div class="user-img">
                            <img :src="user.links.gravatar" class="img-responsive">
                        </div>
                        {{ user.name }}
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

                        <div class="divider" v-if="userCan('manage-users')"></div>

                        <div class="item" v-if="userCan('manage-users')">
                            <route href="users">
                                <i class="mdi mdi-settings margin-right-5"></i>
                                Configurações do Sistema
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
        </ul>
    </div>
</template>

<script type="text/babel">
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