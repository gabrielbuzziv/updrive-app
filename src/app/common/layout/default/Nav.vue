<template>
    <div class="sidebar" :class="{ 'minimize': ! sidebar }">
        <button class="btn btn-blank btn-toggle hidden-sm hidden-md hidden-lg" @click="toggleMenu">
            <i class="mdi mdi-menu"></i>
        </button>

        <div class="user-panel hidden-xs">
            <div class="user-img">
                <img :src="user.links.gravatar" class="img-responsive">
            </div>
            <div class="user-info" v-if="sidebar">
                <span class="name">{{ user.name }}</span>
                <small class="email">{{ user.email }}</small>
            </div>
        </div>

        <ul class="nav menu" :class="{ 'open': menu }">
            <li class="header" v-if="sidebar">Menu</li>

            <route href="dashboard" tag="li" exact v-if="userCan('manage-core')">
                <a href="#">
                    <i class="mdi mdi-speedometer"></i>
                    <span>Dashboard <i class="mdi mdi-chevron-right"></i></span>
                </a>
            </route>

            <route href="updrive" tag="li">
                <a href="#">
                    <i class="mdi mdi-file-multiple"></i>
                    <span>UP Drive<i class="mdi mdi-chevron-right"></i></span>
                </a>
            </route>

            <route href="companies.list" tag="li" v-if="userCan('manage-core')">
                <a href="#">
                    <i class="mdi mdi-domain"></i>
                    <span>Empresas<i class="mdi mdi-chevron-right"></i></span>
                </a>
            </route>

            <route href="contacts.list" tag="li" v-if="userCan('manage-core')">
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
        data () {
            return {
                menu: false,
            }
        },

        computed: {
            user () {
                return this.$store.getters['auth/GET_USER']
            },

            sidebar () {
                return this.$store.getters['global/GET_SIDEBAR']
            }
        },

        methods: {
            toggleMenu () {
                this.menu = !this.menu
            }
        }
    }
</script>