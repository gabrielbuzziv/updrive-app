<template>
    <el-dialog title="Enviar Documentos" :visible.sync="visible">
        <form action="" class="send-document-form horizontal" @submit.prevent="onSubmit" ref="form">
            <div class="form-group">
                <label>Empresa:</label>
                <selector class="field"
                          v-model="form.company"
                          option-value="id"
                          option-label="name"
                          :options="companies"
                          :limit="1"
                          @change="changeCompany">
                </selector>
            </div>

            <div class="form-group" v-if="hasCompany">
                <label>Para:</label>
                <selector class="field"
                          v-model="form.contacts"
                          option-value="id"
                          option-label="email"
                          :options="contacts"
                          :filter-method="filterContacts"
                          :validation-method="validateContacts">

                    <template scope="data">
                        <div class="option-image">
                            <img :src="data.option.links.gravatar" alt="">
                        </div>

                        <div class="option-info">
                            <b>{{ data.option.name }}</b>
                            <span>{{ data.option.email }}</span>
                        </div>
                    </template>

                </selector>
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
                                <i class="mdi icon" :class="getFileIcon(file)"></i>

                                <div class="data">
                                    <span class="name">{{ file.name }}</span>
                                    <span class="date" v-if="file.cycle">Competência: <b>{{ file.cycle }}</b></span>
                                    <span class="divider" v-if="file.cycle && file.validity">|</span>
                                    <span class="date" v-if="file.validity">
                                        Vencimento: <b>{{ file.validity }}</b></span>
                                </div>

                                <div class="buttons">
                                    <div class="btn-group">
                                        <button class="btn btn-default btn-sm" @click.prevent="file.editing = true">
                                            <i class="mdi mdi-pencil-circle margin-right-5"></i>
                                            Editar
                                        </button>

                                        <button class="btn btn-default btn-sm" @click.prevent="removeFile(file)">
                                            <i class="mdi mdi-delete-circle"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div v-else>
                                <i class="mdi icon" :class="getFileIcon(file)"></i>

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
                                    <button class="btn btn-success btn-sm" type="button"
                                            @click.prevent="saveFile(file)">
                                        <i class="mdi mdi-check-circle margin-right-5"></i>
                                        Atualizar
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
            hasCompany () {
                return this.form.company.length
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
                        })
            },

            onSubmit () {
                const data = new FormData()

                data.append('company', this.form.company[0].value)
                this.form.contacts.forEach(contact => data.append('contacts[]', contact.value))
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

            changeCompany (value) {
                this.form.contacts = []

                if (value.length) {
                    const company = value[0]
                    if (typeof company.value == 'number') {
                        services.getCompanyContacts(company.value)
                                .then(response => {
                                    this.form.contacts = response.data.items.map(contact => {
                                        return { value: contact.id, label: contact.email }
                                    })
                                })
                    }
                }
            },

            filterContacts: debounce (function (query) {
                services.getContacts(query)
                        .then(response => {
                            this.contacts = response.data.items
                            this.$root.$emit('filter::options')
                        })
            }, 300),

            validateContacts (contact) {
                const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const valid = re.test(contact)
                console.log(valid)
                if (! valid) {
                    this.$message.error('Precisa preencher um e-mail válido.')
                }
                return valid;
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

            getFileIcon (file) {
                const extension = file.extension
                const icons     = {
                    default: 'mdi-file-document-box',
                    csv: 'mdi-file-excel-box',
                    xls: 'mdi-file-excel-box',
                    pdf: 'mdi-file-pdf-box',
                    doc: 'mdi-file-word-box',
                    docx: 'mdi-file-word-box',
                    jpg: 'mdi-image',
                    png: 'mdi-image',
                    gif: 'mdi-image',
                    jpeg: 'mdi-image',
                    rar: 'mdi-zip-box',
                    zip: 'mdi-zip-box',
                }

                return icons[extension] ? icons[extension] : icons['default']
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