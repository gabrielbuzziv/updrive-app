<template>
    <div class="email-delivered">
        <div class="icon">
            <i class="mdi mdi-email"></i>
        </div>

        <span class="message">
            <b>{{ data.recipient.email }}</b>
            recebeu o e-mail "{{ data.subject }}".
        </span>
    </div>
</template>

<script>
    export default {
        props: ['data']
    }
</script>