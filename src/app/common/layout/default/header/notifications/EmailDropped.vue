<template>
    <div class="default">
        <div class="icon">
            <i class="mdi mdi-email-open"></i>
        </div>

        <span class="message">
            Falha ao enviar o e-mail X para Y.
        </span>
    </div>
</template>

<script>
    export default {
        props: ['data']
    }
</script>