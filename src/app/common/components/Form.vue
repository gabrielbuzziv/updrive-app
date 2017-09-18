<template>
    <form method="post" :class="{ 'submited': submited }" @submit.prevent="$emit('submit')" ref="form">
        <slot></slot>
    </form>
</template>

<script type="text/babel">
    export default {
        data () {
            return {
                submited: false
            }
        },

        methods: {
            validate (fields) {
                let errors = {}

//                fields.forEach(field => {
//                    const label  = field.previousElementSibling.textContent
//                    const name   = field.getAttribute('name')
//                    errors[name] = [`O campo ${label} é obrigatório.`]
//                })

                this.submited = true
                this.$store.dispatch('global/SET_VALIDATION_ERROR', [['Os campos * são obrigatórios.']])
            },
        },

        mounted () {
            const form  = this.$refs.form
            const $this = this

            form.addEventListener('invalid', function (event) {
                $this.validate(form.querySelectorAll(":invalid"))
                event.preventDefault()
            }, true)
        }
    }
</script>
