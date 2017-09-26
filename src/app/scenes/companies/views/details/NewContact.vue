<template>
    <el-dialog title="Adicionar Contato" size="tiny" :visible.sync="visible" @close="close" @open="open">
        <validation-error />

        <v-form action="" method="post" @submit="onSubmit" ref="form">
            <input type="hidden" name="_method" value="post">

            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon">
                        <i class="mdi mdi-email"></i>
                    </div>
                    <input type="text" name="contacts" class="form-control" placeholder="Adicionar por endereço de e-mail, separado por vírgula." v-model="contacts" ref="focus">
                </div>
            </div>

            <div class="el-dialog__footer no-padding no-border">
                <div class="text-left">
                    <button class="btn btn-success btn-rounded" :disabled="adding || empty">
                        <span class="loader button inline light margin-right-5" v-if="adding"></span>
                        <i class="mdi mdi-plus-circle margin-right-5" v-else></i>
                        Adicionar
                    </button>

                    <a href="#" class="btn btn-blank" @click.prevent="close">
                        Cancelar
                    </a>
                </div>
            </div>
        </v-form>
    </el-dialog>
</template>

<script type="text/babel">
    import services from '../../services'
    import { debounce, isEmpty } from 'lodash'

    export default {
        data () {
            return {
                visible: false,
                contacts: '',
                adding: false,
            }
        },

        computed: {
            empty () {
                return ! isEmpty(this.contacts) ? false : true
            }
        },

        methods: {
            load () {
                this.contacts = ''
                this.visible = true
            },

            onSubmit () {
                const company = this.$route.params.id
                const data = new FormData()
                let contacts = this.contacts.split(',')
                let valid = true

                contacts.forEach(email => {
                    email = email.trim()
                    if (! this.isValidEmail(email)) {
                        this.$store.dispatch('global/SET_VALIDATION_ERROR', [[`"${email}" não é um email válido`]])
                        contacts.length = 0
                        valid = false
                    }

                    data.append('contacts[]', email)
                })

                if (valid) {
                    this.adding = true
                    services.addContact(company, data)
                            .then(() => {
                                this.adding = false
                                this.close()
                                this.$store.dispatch('companies/FETCH_CONTACTS', { company })
                            })
                            .catch(() => this.adding = false)
                }
            },

            isValidEmail (email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (re.test(email) === false) {
                    return false
                }

                return true
            },

            close () {
                this.visible = false
            },

            open () {
                setTimeout(() => {
                    this.$refs.focus.focus()
                }, 1)
            },

            isNew (contact) {
                return isEmpty(contact) ? true : false
            }
        },

        mounted () {
            this.$root.$on('new::contact', () => this.load())
        },

        beforeDestroy () {
            this.$root.$off('new::contact')
        }
    }
</script>