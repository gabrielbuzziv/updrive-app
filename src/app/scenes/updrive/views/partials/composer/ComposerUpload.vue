<template>
    <label class="upload-button">
        <input type="file" multiple @change="addFiles">
        <span class="btn btn-blank">
            <i class="mdi mdi-paperclip margin-right-5"></i>
            Adicionar documentos
        </span>
    </label>
</template>

<script>
    import Helper from 'common/Helper'
    import { forEach } from 'lodash'

    export default {
        props: ['attachments'],

        data () {
            return {
                files: []
            }
        },

        methods: {
            addFiles (e) {
                const files = e.target.files

                forEach(files, file => {
                    const filename = Helper.getFilename(file.name)

                    const attachment = {
                        name: filename.name,
                        extension: filename.extension,
                        cycle: null,
                        validity: null,
                        file: file,
                        editing: false
                    }

                    this.files.push(attachment)
                    this.$emit('update:attachments', this.files)
                })

                e.target.value = null
            }
        }
    }
</script>