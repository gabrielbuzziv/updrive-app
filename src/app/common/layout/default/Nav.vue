<template>
    <div class="sidebar">
        <ul class="nav menu" :class="{ 'open': menu }">
            <route href="dashboard" tag="li" exact v-if="userCan('manage-core')">
                <a href="#">
                    <i class="mdi mdi-speedometer"></i>
                    Dashboard
                </a>
            </route>

            <route href="updrive" tag="li">
                <a href="#">
                    <i class="mdi mdi-file-document-box"></i>
                    UP Drive
                </a>
            </route>

            <route href="companies.list" tag="li" v-if="userCan('manage-core')">
                <a href="#">
                    <i class="mdi mdi-store"></i>
                    Empresas
                </a>
            </route>

            <route href="contacts.list" tag="li" v-if="userCan('manage-core')">
                <a href="#">
                    <i class="mdi mdi-account-multiple"></i>
                    Contatos
                </a>
            </route>

            <route href="reports" tag="li" v-if="userCan('manage-core')">
                <a href="#">
                    <i class="mdi mdi-chart-areaspline"></i>
                    Relatórios
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
        },
    }
</script>