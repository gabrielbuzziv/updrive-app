<template>
    <div class="dead-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">

                    <header>
                        <h1>Infelizmente, seu perído de testes chegou ao fim!</h1>
                        <h2>
                            Entre em contato conosco para continuar utilizando o UP Drive.
                        </h2>
                    </header>

                    <div class="illustration">
                        <img src="/src/assets/images/inactive/coffe-laptop.png" class="img-responsive" alt="">
                    </div>

                    <footer>
                        <ul>
                            <li>
                                <a href="http://www.updrive.com.br">
                                    <img src="/src/assets/images/inactive/icons/icon-2.png" alt="">
                                </a>
                                <span>Ir para nosso site</span>
                            </li>
                            <li>
                                <a href="mailto:contato@updrive.com.br">
                                    <img src="/src/assets/images/inactive/icons/icon-3.png" alt="">
                                </a>
                                <span>Entrar em contato</span>
                            </li>
                        </ul>
                    </footer>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted () {
            window.axios.get(`accounts/status`)
                .then(response => {
                    if (response.data.status)
                        this.$route.go('/')
                });
        }
    }
</script>

<style lang="scss">
    @import './src/assets/scss/inactive';
</style>