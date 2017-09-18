<template>
    <li>
        <small>{{ name }}</small>
        <strong v-if="$slots['default']">
            <slot></slot>
        </strong>

        <em v-else>
            Não Informado
        </em>
    </li>
</template>

<script type="text/babel">
    export default {
        props: {
            name: {
                type: String,
                required: true
            }
        }
    }
</script>
