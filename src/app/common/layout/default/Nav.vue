<template>
    <div class="sidebar" :class="{ 'minimize': ! sidebar }">
        <div class="user-panel">
            <div class="user-img">
                <img :src="user.links.gravatar" class="img-responsive">
            </div>
            <div class="user-info" v-if="sidebar">
                <span class="name">{{ user.name }}</span>
                <small class="email">{{ user.email }}</small>
            </div>
        </div>

        <ul class="nav menu">
            <li class="header" v-if="sidebar">Menu</li>

            <route href="updrive" tag="li">
                <a href="#">
                    <i class="mdi mdi-file-multiple"></i>
                    <span>UP Drive<i class="mdi mdi-chevron-right"></i></span>
                </a>
            </route>

            <route href="companies.list" tag="li" v-if="userCan('manage-companies')">
                <a href="#">
                    <i class="mdi mdi-domain"></i>
                    <span>Empresas<i class="mdi mdi-chevron-right"></i></span>
                </a>
            </route>

            <route href="contacts.list" tag="li" v-if="userCan('manage-contacts')">
                <a href="#">
                    <i class="mdi mdi-account-multiple"></i>
                    <span>Contatos<i class="mdi mdi-chevron-right"></i></span>
                </a>
            </route>
        </ul>
    </div>
</template>

<script type="text/babel">
    export default {
        computed: {
            user () {
                return this.$store.getters['auth/GET_USER']
            },

            sidebar () {
                return this.$store.getters['global/GET_SIDEBAR']
            }
        }
    }
</script>