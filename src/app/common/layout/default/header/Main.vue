<template>
    <div id="header">
        <div class="logo" :class="{ 'minimize': ! sidebar }">
            <h1>
                <route href="updrive">
                    <span class="hidden-xs hidden-sm">
                        <span v-if="sidebar">
                            UP Drive
                        </span>

                        <span v-else>
                            UP
                        </span>
                    </span>

                    <span class="hidden-md hidden-lg">
                        UP
                    </span>
                </route>
            </h1>
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