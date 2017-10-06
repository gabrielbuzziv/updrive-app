<template>
    <div class="document-opened">
        <div class="icon">
            <img :src="data.contact.links.gravatar" alt="">
        </div>

        <span class="message">
            <b>{{ data.contact.name }}</b>
            abriu o documento {{ data.document.name }}.
        </span>
    </div>
</template>

<script>
    export default {
        props: ['data']
    }
</script>