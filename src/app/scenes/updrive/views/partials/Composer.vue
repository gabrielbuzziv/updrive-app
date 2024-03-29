<template>
    <div id="composer" :class="[isFullscreen ? 'fullscreen' : '', ! isOpen ? 'minimized' : '', attachmentClass]"
         v-if="isVisible">
        <composer-header :title="title" :fullscreen.sync="isFullscreen" :open.sync="isOpen" :visible.sync="isVisible"/>

        <div class="composer-body" v-show="isOpen">
            <form action="" @submit.prevent="onSubmit" ref="form">
                <div class="line company">
                    <label>Empresa</label>
                    <selector class="field"
                              v-model="form.company"
                              option-value="id"
                              option-label="name"
                              :options="companies"
                              :limit="1"
                              :filter-method="filterCompanies"
                              @change="changeCompany"
                              ref="focus">

                        <template scope="data">
                            <div class="option-icon">
                                <div class="frame">
                                    <span v-if="data.option.identifier">
                                        {{ data.option.identifier }}
                                    </span>
                                    <i class="mdi mdi-domain" v-else></i>
                                </div>
                            </div>

                            <div class="option-info">
                                <b>{{ data.option.name }}</b>
                                <span>{{ data.option.email }}</span>
                            </div>
                        </template>
                    </selector>
                </div>

                <div class="line to" v-if="hasCompany">
                    <label>Para</label>
                    <selector-contacts
                            v-model="form.contacts"
                            :options="contacts"
                            :filter-method="filterContacts"
                            :validation-method="validateContacts"/>

                    <dropdown class="options"
                              title="Contatos Relacionados"
                              buttonClass="btn btn-blank"
                              right
                              v-if="suggestedContacts.length">
                        <template slot="button">
                            <i class="mdi mdi-account-multiple"></i>
                        </template>

                        <template slot="items">
                            <div class="item header">
                                Contatos relacionados
                            </div>

                            <div class="item" v-for="contact in suggestedContacts">
                                <a href="#" @click.prevent="addContact(contact)">
                                    <i class="mdi mdi-email margin-right-5"></i>
                                    {{ contact.email }}

                                    <span class="tags" v-if="contact.tags.length">
                                        {{ joinTags(contact.tags) }}
                                    </span>
                                </a>
                            </div>
                        </template>
                    </dropdown>
                </div>

                <div class="line subject">
                    <input type="text" class="field" placeholder="Assunto" v-model="form.subject">
                </div>

                <div class="line editor">
                    <vue-summernote ref="editor" placeholder=""></vue-summernote>
                </div>

                <composer-attachments :attachments.sync="form.attachments" :open.sync="showAttachment"/>

                <div class="composer-footer">
                    <button class="btn btn-secondary" type="submit" :disabled="! valid || submiting">
                        <span class="loader button inline light margin-right-5" v-if="submiting"></span>
                        <i class="mdi mdi-check-circle margin-right-5" v-else></i>
                        Enviar
                    </button>

                    <composer-upload :attachments.sync="form.attachments"/>

                    <el-tooltip content="Descartar" placement="top">
                        <button class="btn btn-default pull-right" @click.prevent="onClose">
                            <i class="mdi mdi-delete"></i>
                        </button>
                    </el-tooltip>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import ComposerHeader from './composer/ComposerHeader'
    import ComposerAttachments from './composer/ComposerAttachments'
    import ComposerUpload from './composer/ComposerUpload'
    import SelectorContacts from './composer/SelectorContacts'
    import services from '../../services'
    import { debounce } from 'lodash'

    export default {
        components: { ComposerHeader, ComposerAttachments, ComposerUpload, SelectorContacts },

        data () {
            return {
                isVisible: false,
                isFullscreen: false,
                isOpen: true,
                showAttachment: false,
                submiting: false,

                form: {
                    company: [],
                    contacts: [],
                    subject: '',
                    message: '',
                    attachments: []
                },

                companies: [],
                contacts: [],
                suggestedContacts: []
            }
        },

        computed: {
            title () {
                return this.form.subject || 'Enviar documentos'
            },

            hasCompany () {
                return this.form.company.length
            },

            valid () {
                return this.hasCompany && this.form.contacts.length && this.form.attachments.length && ! this.hasExceededLimit && ! this.hasExceededSize
            },

            attachmentClass () {
                return (this.form.attachments.length) ?
                    (this.showAttachment) ?
                        'attachments-opened'
                        : 'attachments-closed'
                    : ''
            },

            files () {
                return {
                    amount: this.form.attachments.length,
                    size: this.form.attachments.reduce((carry, file) => carry + file.file.size, 0)
                }
            },

            hasInvalidFiles () {
                return ! ! this.form.attachments.filter(file => file.name == '' || file.name == null).length
            },

            hasExceededLimit () {
                return this.files.amount > 15
            },

            hasExceededSize () {
                return this.files.size > 52428800
            },

            tags () {
                return this.$store.getters['updrive/GET_TAGS']
            }
        },

        watch: {
            files () {
                if (this.files.amount > 15) {
                    this.$message.error('Você pode anexar apenas 15 documentos por envio.')
                }

                if (this.files.size >= 52428800) {
                    this.$message.error('Você atingiu o limite de tamanho de 50MB por envio.')
                }
            }
        },

        methods: {
            load () {
                this.isVisible = true
                this.isOpen = true
                this.form = {
                    company: [],
                    contacts: [],
                    subject: '',
                    message: '',
                    attachments: []
                }
                this.suggestedContacts = []

                this.$store.dispatch('updrive/FETCH_TAGS')

                Vue.nextTick(() => {
                    this.$refs.focus.$el.querySelector('label').focus()

                    const editor = this.$refs.editor
                    editor.$on('onChange', content => this.form.message = content)
                })
            },

            onSubmit () {
                const data = new FormData()

                data.append('company', this.form.company[0].value)
                this.form.contacts.forEach(contact => data.append('contacts[]', contact))
                data.append('subject', this.form.subject)
                data.append('message', this.form.message)

                this.form.contacts.forEach((contact, index) => {
                    data.append(`contacts[${index}][value]`, contact.value)

                    if (contact.options && contact.options.tags && contact.options.tags.length) {
                        contact.options.tags.forEach(tag => {
                            data.append(`contacts[${index}][tags][]`, parseInt(tag))
                        })
                    }
                })

                this.form.attachments.forEach(attachment => {
                    data.append(`documents[]`, JSON.stringify(attachment))
                    data.append(`files[]`, attachment.file)
                })

                if (this.form.attachments.length) {
                    if (this.hasInvalidFiles) {
                        this.$message.error('Todos os documentos devem ter nome.')
                        return false
                    }

                    if (this.hasExceededLimit) {
                        this.$message.error('Ops, você pode carregar no máximo 20 arquivos.')
                        return false
                    }

                    if (this.hasExceededSize) {
                        this.$message.error('Ops, você excedeu o limite máximo de 50MB.')
                        return false
                    }

                    this.submiting = true
                    services.send(data)
                        .then(response => {
                            this.submiting = false
                            this.onClose()
                            this.$root.$emit('load::companies')
                            this.$message.success('Os documentos foram enviados.')
                            this.$store.dispatch('updrive/UPDATE_COMPANY', response.data.company)
                        })
                        .catch(() => this.submiting = false)
                } else {
                    this.$message.error('Você precisa adicionar documentos para prosseguir.')
                }
            },

            onClose () {
                this.isVisible = false
            },

            filterCompanies: debounce(function (query) {
                services.getCompanies(query)
                    .then(response => {
                        this.companies = query.length > 0 ? response.data.items : []
                    })
            }, 200),

            changeCompany (value) {
                this.form.contacts = []

                if (value.length) {
                    const company = value[0]
                    if (typeof company.value == 'number') {
                        services.getCompanyContacts(company.value)
                            .then(response => {
                                this.suggestedContacts = response.data.items
                            })
                    }
                }
            },

            filterContacts: debounce(function (query) {
                services.getContacts(query)
                    .then(response => {
                        const contacts = response.data.items.map(contact => {
                            const tags = contact.tags.map(tag => tag.id)
                            delete contact['tags']

                            return { ...contact, options: { tags } }
                        })

                        this.contacts = query.length > 0 ? contacts : []
                    })
            }, 200),

            validateContacts (contact) {
                if (contact.length > 0) {
                    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    const valid = re.test(contact)
                    if (! valid) {
                        this.$message.error('Precisa preencher um e-mail válido.')
                    }
                    return valid
                }

                return true
            },

            addContact (contact) {
                this.form.contacts.push({
                    value: contact.id,
                    label: contact.email,
                    options: { tags: contact.tags.map(tag => tag.id) }
                })
            },

            joinTags (tags) {
                return tags.map(tag => tag.name).join(', ')
            }
        },

        mounted () {
            this.$root.$on('open::composer', () => ! this.isVisible ? this.load() : '')
        },

        beforeDestroy () {
            this.$root.$off('open::composer')
        }
    }
</script>