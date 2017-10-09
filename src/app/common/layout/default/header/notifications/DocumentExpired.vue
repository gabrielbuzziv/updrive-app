<template>
    <div class="default">
        <div class="icon">
            <i class="mdi mdi-calendar-remove"></i>
        </div>

        <span class="message">
            Os documentos <b>{{ documents }}</b> venceram.
        </span>
    </div>
</template>

<script>
    export default {
        props: ['data'],

        computed: {
            documents () {
                return this.data.documents.map(document => document.name).join(', ')
            }
        }
    }
</script>