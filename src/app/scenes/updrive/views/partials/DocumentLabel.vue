<template>
    <span class="label" :class="`label-${label.type}`">
        <i class="mdi margin-right-5" :class="`mdi-${label.icon}`"></i>
        {{ label.description }}
    </span>
</template>

<script type="text/babel">
    export default {
        props: ['document'],

        computed: {
            label () {
                const status = parseInt(this.document.status.id)
                switch (status) {
                    case 1:
                        return { type: 'warning', description: 'Envio pendente', icon: 'clock' }
                    case 2:
                        return { type: 'warning', description: 'Pendente', icon: 'clock' }
                    case 3:
                        return { type: 'success', description: 'Aberto', icon: 'check' }
                    case 4:
                        return { type: 'danger', description: 'Vencido', icon: 'calendar-remove' }
                    default:
                        return { type: 'danger', description: 'Verificar', icon: 'load' }
                }
            }
        }
    }
</script>
