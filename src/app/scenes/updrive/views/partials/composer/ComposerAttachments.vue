<template>
    <div class="composer-attachments" v-if="attachments.length">
        <header class="attachments-header" @click.prevent="toggle">
            <div class="attachments-title">
                <i class="mdi mdi-paperclip margin-right-5"></i>
                {{ attachments.length }} documentos anexados
            </div>

            <div class="attachments-options">
                <button class="btn btn-blank">
                    <i class="mdi mdi-chevron-down" v-if="open"></i>
                    <i class="mdi mdi-chevron-up" v-else></i>
                </button>
            </div>
        </header>

        <div class="attachments-box" v-if="open">
            <div class="attachment" v-for="attachment in attachments">
                <div v-if="attachment.editing">
                    <div class="name">
                        <input type="text" v-model="attachment.name" placeholder="Documento" @keypress.enter="attachment.editing = false">
                        <input type="text" v-model="attachment.cycle" placeholder="Competência" v-mask="'##/####'" @keypress.enter="attachment.editing = false">
                        <input type="text" v-model="attachment.validity" placeholder="Vencimento" v-mask="'##/##/####'" @keypress.enter="attachment.editing = false">
                    </div>
                    <div class="options">
                        <button class="btn btn-success btn-sm" @click.prevent="attachment.editing = false">
                            <i class="mdi mdi-check margin-left-15 margin-right-15"></i>
                        </button>
                    </div>
                </div>

                <div v-else>
                    <div class="name">
                        <i class="mdi margin-right-5" :class="getIcon(attachment)"></i>
                        <a :href="getFilePreviewUrl(attachment.file)" target="_blank">
                            {{ attachment.name }}
                            <small v-if="attachment.validity">(vencimento no dia {{ attachment.validity }})</small>
                        </a>
                    </div>
                    <div class="options">
                        <div class="btn-group">
                            <button class="btn btn-default btn-sm" @click.prevent="attachment.editing = true"
                                    title="Editar">
                                <i class="mdi mdi-pencil"></i>
                            </button>

                            <button class="btn btn-default btn-sm" title="Remover" @click.prevent="removeAttachment(attachment)">
                                <i class="mdi mdi-delete"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['attachments', 'open'],

        methods: {
            toggle () {
                this.$emit('update:open', ! this.open)
            },

            removeAttachment (attachment) {
                const index = this.attachments.indexOf(attachment)
                this.attachments.splice(index, 1)
            },

            getIcon (attachment) {
                const extension = attachment.extension
                const icons = {
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

            getFilePreviewUrl (attachment) {
                return URL.createObjectURL(attachment)
            },
        }
    }
</script>