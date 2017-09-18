<template>
    <div class="pagination pull-right">
        <span>{{ records }} resultados.</span>
        <span>Página {{ page }} de {{ pages }} páginas</span>

        <div class="btn-group">
            <button class="btn btn-default" :disabled="! hasPrevious" @click.prevent="previous">
                <i class="mdi mdi-chevron-left"></i>
            </button>

            <button class="btn btn-default" :disabled="! hasNext" @click.prevent="next">
                <i class="mdi mdi-chevron-right"></i>
            </button>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            namespace: {
                type: String,
                required: true
            }
        },

        computed: {
            hasNext () {
                return (this.page < this.pages) ? true : false
            },

            hasPrevious () {
                return (this.page > 1) ? true : false
            },

            pages () {
                return Math.ceil(this.records / 25)
            },

            page () {
                return this.$store.getters[`${this.namespace}/GET_PAGE`]
            },

            records () {
                return this.$store.getters[`${this.namespace}/GET_RECORDS`]
            },
        },

        methods: {
            next () {
                this.$store.dispatch(`global/SET_PAGE`, {
                    namespace: this.namespace,
                    value: this.page + 1
                })
                this.$store.dispatch(`${this.namespace}/FETCH_ALL`)
            },

            previous () {
                this.$store.dispatch(`global/SET_PAGE`, {
                    namespace: this.namespace,
                    value: this.page - 1
                })
                this.$store.dispatch(`${this.namespace}/FETCH_ALL`)
            }
        }
    }
</script>
