<template>
    <div id="header">
        <div class="logo">
            <h1>
                <route href="dashboard">
                    <img src="/src/assets/images/logo.png" title="UP Drive">
                </route>
            </h1>
        </div>

        <button class="btn btn-success btn-rounded btn-sm btn-documents"
                @click.prevent="$root.$emit('open::composer')"
                v-if="userCan('manage-core')">
            <i class="mdi mdi-plus-circle margin-right-5"></i>
            Enviar documentos
        </button>

        <header-menu/>
    </div>
</template>

<script type="text/babel">
    import HeaderMenu from './Menu'

    export default {
        components: { HeaderMenu },
    }
</script>