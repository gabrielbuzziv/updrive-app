<template>
    <div id="notice" v-if="daysLeft > 0">
        <div class="message">
            <h4>{{ notice }}</h4>
            <p>Fale conosco para continuar utilizando a ferramenta.</p>
        </div>

        <a href="http://www.updrive.com.br" class="btn btn-success" target="_blank">
            Entrar em contato
        </a>
    </div>
</template>

<script>
    export default {
        computed: {
            daysLeft () {
                return this.trialExpire.diff(this.now, 'days')
            },

            now () {
                return moment({ hour: 0, minute: 0, second: 0 })
            },

            trialExpire () {
                return moment(this.$store.getters['global/GET_STATUS'].trial_expire_at)
            },

            notice () {
                if (this.daysLeft > 1) {
                    return `O período de testes está acabando, faltam apenas ${this.daysLeft} dias.`
                }

                return 'O período de testes acaba amanhã.'
            }
        },
    }
</script>