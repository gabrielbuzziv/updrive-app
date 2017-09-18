<template>
    <v-form :action="action" method="post" @submit="onSubmit" ref="form">
        <input type="hidden" name="_method" :value="method">
        <slot></slot>
    </v-form>
</template>

<script type="text/babel">
    import services from '../services'

    export default {
        props: {
            action: String,
            method: String
        },

        methods: {
            onSubmit () {
                const form = this.$refs.form.$el
                const action = this.action

                this.$store.dispatch('global/SET_SUBMITING', true)
                services.save(action, new FormData(form))
                        .then(response => {
                            if (response.status == 201) {
                                this.$message.success(`A empresa foi adicionada com sucesso.`)
                                this.$router.push({ name: 'companies.list' })
                            } else if (response.status == 200) {
                                this.$message.success(`A empresa foi alterada com sucesso.`)
                                this.$router.push({ name: 'companies.details', params: { id: response.data.id } })
                            }
                            this.$store.dispatch('global/SET_SUBMITING', false)
                        })
                        .catch(() => {
                            this.$store.dispatch('global/SET_SUBMITING', false)
                        })
            }
        }
    }
</script>