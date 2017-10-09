<template>
    <div class="default">
        <div class="icon">
            <i class="mdi mdi-email-open"></i>
        </div>

        <span class="message">
            <b>{{ data.contact.email }}</b>
            abriu o e-mail "{{ data.subject }}".
        </span>
    </div>
</template>

<script>
    export default {
        props: ['data']
    }
</script>