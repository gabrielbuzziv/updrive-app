<template>
    <div id="header">
        <div class="logo" :class="{ 'minimize': ! sidebar }">
            <h1 v-if="sidebar"><route href="updrive">UP Drive</route></h1>
            <h1 v-else><route href="updrive">UD</route></h1>
        </div>

        <div class="toggle-sidebar">
            <a href="" @click.prevent="toggleSidebar">
                <i class="mdi mdi-menu"></i>
            </a>
        </div>

        <header-menu />
    </div>
</template>

<script type="text/babel">
    import HeaderMenu from './Menu'

    export default {
        components: { HeaderMenu },

        computed: {
            sidebar () {
                return this.$store.getters['global/GET_SIDEBAR']
            }
        },

        methods: {
            toggleSidebar () {
                this.$store.dispatch('global/SET_SIDEBAR', ! this.sidebar)
            }
        }
    }
</script>