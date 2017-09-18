<template>
    <el-dialog title="Enviar Documentos" :visible.sync="visible">
        <form action="" class="send-document-form horizontal" @submit.prevent="onSubmit" ref="form" enctype="multipart/form-data">
            <div class="form-group">
                <label>Empresa:</label>
                <el-select
                        multiple
                        filterable
                        allow-create
                        placeholder=""
                        :multiple-limit="1"
                        default-first-option
                        v-model="form.company"
                        @change="companySelected"
                        popper-class="custom-popper"
                        class="custom-select no-icon field"
                        @visible-change="showMoreCompanies"
                        no-data-text="Ops, não encontramos nenhuma empresa."
                        ref="company">
                    <el-option v-for="company in companies" :value="company.id" :label="company.name" :key="company.id">
                        <span class="icon" :style="`background: ${getColor(company.name)}`">
                            {{ company.name | firstLetter }}
                        </span>
                        <span class="name">
                            {{ company.name }}
                            <small>{{ company.email }}</small>
                        </span>
                    </el-option>
                </el-select>
            </div>

            <div class="form-group" v-if="hasCompany">
                <label>Para:</label>
                <el-select
                        multiple
                        filterable
                        allow-create
                        placeholder=""
                        default-first-option
                        v-model="form.contacts"
                        @change="contactSelected"
                        popper-class="custom-popper contact-popper"
                        class="custom-select multiple no-icon field"
                        no-data-text="Ops, esta empresa ainda não tem contatos, adicione digitando o e-mail do contato desejado."
                        ref="contacts">
                    <el-option-group label="Contatos da empresa">
                        <el-option v-for="contact in contacts" :value="contact.id" :label="contact.email"
                                   :key="contact.id">
                            <span class="icon" :style="`background: ${getColor(contact.name)}`">
                                {{ contact.name | firstLetter }}
                            </span>
                            <span class="name">
                                {{ contact.name }}
                                <small>{{ contact.email }}</small>
                            </span>
                        </el-option>
                    </el-option-group>
                </el-select>
            </div>

            <div class="form-group">
                <label>Assunto:</label>
                <input type="text" class="form-control field" placeholder="Adicione um assunto" v-model="form.subject">
                <small class="helper-block offset">Caso vazio o assunto será: "Novos documentos disponíveis."</small>
            </div>

            <div class="form-group">
                <div class="content">
                    <textarea v-model="form.message" rows="10" class="form-control"
                              placeholder="Deixe uma observação"></textarea>

                    <div class="attachments">
                        <div class="file" v-for="file in form.files">
                            <div v-if="! file.editing">
                                <div class="data">
                                    <span class="name">{{ file.name }}</span>
                                    <span class="date" v-if="file.cycle">Competência: <b>{{ file.cycle }}</b></span>
                                    <span class="divider" v-if="file.cycle && file.validity">|</span>
                                    <span class="date" v-if="file.validity">
                                        Vencimento: <b>{{ file.validity }}</b></span>
                                </div>

                                <div class="buttons">
                                    <button class="btn btn-blank margin-right-5" @click.prevent="file.editing = true">
                                        <i class="mdi mdi-pencil"></i>
                                    </button>

                                    <button class="btn btn-blank" @click.prevent="removeFile(file)">
                                        <i class="mdi mdi-close"></i>
                                    </button>
                                </div>
                            </div>

                            <div v-else>
                                <div class="data">
                                    <input type="text" class="form-control" v-model="file.name" placeholder="Documento"
                                           @keydown="saveWithEnter($event, file)">
                                    <input type="text" class="form-control" v-model="file.cycle" v-mask="'##/####'"
                                           placeholder="Competência" @keydown="saveWithEnter($event, file)">
                                    <input type="text" class="form-control" v-model="file.validity"
                                           v-mask="'##/##/####'" placeholder="Vencimento"
                                           @keydown="saveWithEnter($event, file)">
                                </div>

                                <div class="buttons">
                                    <button class="btn btn-success" type="button" @click.prevent="saveFile(file)">
                                        <i class="mdi mdi-check"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="el-dialog__footer no-padding no-border">
                <div class="text-left">
                    <button class="btn btn-success btn-rounded" type="submit" :disabled="! valid || submiting">
                        <span class="loader button inline light margin-right-5" v-if="submiting"></span>
                        <i class="mdi mdi-check-circle margin-right-5" v-else></i>
                        Enviar
                    </button>

                    <label class="upload-button">
                        <input type="file" multiple @change="addFiles">
                        <span class="btn btn-default btn-attachment">
                            <i class="mdi mdi-attachment margin-right-5"></i>
                            Adicionar documentos
                            <span v-if="files.amount">
                                ({{ files.amount }})
                            </span>
                        </span>
                    </label>
                </div>
            </div>
        </form>
    </el-dialog>
</template>

<script type="text/babel">
    import services from '../../services'
    import Helper from 'common/Helper'
    import { debounce, forEach, isEmpty } from 'lodash'

    export default {
        data () {
            return {
                visible: false,
                form: {
                    company: [],
                    contacts: [],
                    subject: '',
                    message: '',
                    files: []
                },
                companies: [],
                contacts: [],
                submiting: false,
            }
        },

        filters: {
            firstLetter (value) {
                return value != '' ? value.charAt(0).toUpperCase() : ''
            }
        },

        computed: {
            company () {
                return this.$store.getters['updrive/GET_COMPANY']
            },

            user () {
                return this.$store.getters['auth/GET_USER']
            },

            hasCompany () {
                return ! isEmpty(this.form.company)
            },

            valid () {
                return this.hasCompany && this.form.contacts.length
            },

            hasInvalidFiles () {
                return ! ! this.form.files.filter(file => file.name == '' || file.name == null).length
            },

            contactInput () {
                return this.$refs.contacts.$el.querySelector('.el-select__tags').querySelector('.el-select__input')
            },

            files () {
                return {
                    amount: this.form.files.length,
                    size: this.form.files.reduce((carry, file) => carry + file.file.size, 0)
                }
            },

            hasExceededLimit () {
                return this.files.amount > 20
            },

            hasExceededSize () {
                return this.files.size > 10485760
            }
        },

        methods: {
            load () {
                this.visible = true
                this.form    = {
                    company: [],
                    contacts: [],
                    subject: '',
                    message: '',
                    files: []
                }

                services.getCompanies()
                        .then(response => {
                            this.companies = response.data.items

                            if (this.company) {
                                this.form.company.push(this.company)
                            }
                        })
            },

            onSubmit () {
                const data = new FormData()

                data.append('company', this.form.company)
                this.form.contacts.forEach(contact => data.append('contacts[]', contact))
                data.append('subject', this.form.subject)
                data.append('message', this.form.message)

                this.form.files.forEach(file => {
                    data.append(`documents[]`, JSON.stringify(file))
                    data.append(`files[]`, file.file)
                })

                if (this.form.files.length) {
                    if (this.hasInvalidFiles) {
                        this.$message.error('Todos os documentos devem ter nome.')
                        return false
                    }

                    if (this.hasExceededLimit) {
                        this.$message.error('Ops, você pode carregar no máximo 20 arquivos.')
                        return false
                    }

                    if (this.hasExceededSize) {
                        this.$message.error('Ops, você excedeu o limite máximo de 10MB.')
                        return false
                    }

                    this.submiting = true
                    services.send(data)
                            .then(response => {
                                this.submiting = false
                                this.close()
                                this.$root.$emit('load::companies')
                                this.$message.success('Os documentos foram enviados.')
                                this.$store.dispatch('updrive/UPDATE_COMPANY', response.data.company)
                                this.$store.dispatch('updrive/FETCH_PENDINGS')
                                this.$store.dispatch('updrive/FETCH_ALL')
                                        .then(response => {
                                            this.$router.push({ name: 'updrive.documents' })
                                        })
                            })
                            .catch(() => this.submiting = false)
                } else {
                    this.$message.error('Você precisa adicionar documentos para prosseguir.')
                }
            },

            addFiles (e) {
                const files = e.target.files

                forEach(files, file => {
                    const filename = Helper.getFilename(file.name)

                    const document = {
                        name: filename.name,
                        extension: filename.extension,
                        cycle: null,
                        validity: null,
                        file: file,
                        editing: false
                    }

                    this.form.files.push(document)
                })

                e.target.value = null
            },

            companySelected () {
                this.$refs.company.visible = false

                if (this.hasCompany) {
                    if (typeof this.form.company [0] != 'string') {
                        return services.getContacts(this.form.company)
                                .then(response => {
                                    this.contacts = response.data.items
                                })
                    }

                    return
                }

                this.contacts      = []
                this.form.contacts = []
            },

            showMoreCompanies () {
                if (this.hasCompany) {
                    this.$refs.company.visible = false
                    setTimeout(() => this.contactInput.focus(), 1)
                }
            },

            contactSelected (contacts) {
                contacts.forEach((contact, index) => {
                    if (typeof contact == 'string') {
                        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        if (re.test(contact) === false) {
                            this.form.contacts.splice(index, 1)
                            this.$message.error('Apenas e-mails válidos')
                        }
                    }
                })
            },

            saveFile (file) {
                if (file.name != '' && file.name != null) {
                    file.editing = false
                }
            },

            saveWithEnter (e, file) {
                if (e.keyCode == 13) {
                    this.saveFile(file)
                }
            },

            removeFile (file) {
                const index = this.form.files.indexOf(file)
                this.form.files.splice(index, 1)
            },

            getColor (char) {
                return Helper.getColorByChar(char)
            },

            close () {
                this.visible = false
            }
        },

        mounted () {
            this.$root.$on('send::documents', () => this.load())
        },

        beforeDestroy () {
            this.$root.$off('send::documents')
        }
    }
</script>