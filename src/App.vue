<template>
    <page-load :loading="mounting">
        <router-view></router-view>
    </page-load>
</template>

<script>
    export default {
        data () {
            return {
                mounting: true
            }
        },

        mounted () {
            this.$store.dispatch('global/FETCH_ACCOUNT_STATUS')
                .then(response => {
                    if (response.data.status == false) {
                        this.$router.push({ name: 'inactive' })
                    }

                    this.mounting = false
                })
                .catch(() => this.mounting = false)
        }
    }
</script>

<style lang="scss">
    @import './src/assets/scss/app';
</style>