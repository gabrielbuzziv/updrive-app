<template>
    <v-form :action="action" method="post" @submit="onSubmit" ref="form">
        <input type="hidden" name="_method" :value="method">
        <slot></slot>
    </v-form>
</template>

<script type="text/babel">
    import services from '../services'
    import { debounce } from 'lodash'

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
                                this.$message.success(`O contato foi adicionado com sucesso.`)
                                this.$router.push({ name: 'contacts.list' })
                            } else if (response.status == 200) {
                                this.$message.success(`O contato foi alterado com sucesso.`)
                                this.$router.push({ name: 'contacts.details', params: { id: response.data.id } })
                            }
                            this.$store.dispatch('global/SET_SUBMITING', false)
                        })
                        .catch(() => {
                            this.$store.dispatch('global/SET_SUBMITING', false)
                        })
            },
        }
    }
</script>