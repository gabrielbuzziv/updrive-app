<template>
    <page-load v-if="visible">
        <div class="documents-list" v-if="documents.length">
            <document-item :document="document" v-for="document in documents" :key="document.id" />
        </div>

        <slot name="not-found" v-else>
            <first-time title="Não encontramos documentos" icon="file-multiple"
                        message="Não encontramos documentos aqui.">
                <template slot="buttons">
                    <button class="btn btn-secondary btn-rounded" @click="$root.$emit('open::composer')"
                            v-if="userCan('manage-core')">
                        <i class="mdi mdi-plus-circle margin-right-5"></i>
                        Enviar documentos
                    </button>
                </template>
            </first-time>
        </slot>
    </page-load>
</template>

<script type="text/babel">
    import DocumentItem from './DocumentItem'
    import services from '../../services'

    export default {
        props: {
            documents: {
                type: Array,
                required: true
            },

            hideable: {
                type: Boolean,
                default: false
            },
        },

        components: { DocumentItem },

        computed: {
            token () {
                return localStorage.getItem('auth_token')
            },

            visible () {
                return this.hideable && ! this.documents.length ? false : true
            },

            showCompany () {
                if (this.$store.getters['updrive/GET_COMPANY']) {
                    return false
                }

                return true
            }
        },

        methods: {
            statusDocument (id) {
                this.$root.$emit('status::document', id)
            },

            editDocument (id) {
                this.$root.$emit('edit::document', id)
            },

            removeDocument (id) {
                this.$confirm('Você tem certeza que deseja remover o documento?', 'Remover Documento', {
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    type: 'error'
                }).then(() => {
                    services.removeDocument(id)
                            .then(response => {
                                this.$message.success('Documento removido com sucesso.')
                                this.$store.dispatch('updrive/FETCH_ALL')
                            })
                }).catch(() => {
                })
            },

            getStatus (status) {
                switch (status) {
                    case 2:
                        return {
                            class: 'warning',
                            icon: 'mdi-clock'
                        }
                    case 3:
                        return {
                            class: 'success',
                            icon: 'mdi-check'
                        }
                    case 4:
                        return {
                            class: 'danger',
                            icon: 'calendar-remove'
                        }
                }
            }
        }
    }
</script>
