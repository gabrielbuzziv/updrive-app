<template>
    <div>
        <span class="company">
            <span class="column-label">Empresa</span>
            <a href="#" @click.prevent="setCompany(document.company.id)" class="column-value">
                {{ document.company.name }}
            </a>
        </span>
    </div>
</template>

<script>
    export default {
        props: ['document'],

        methods: {
            setCompany (company) {
                this.$store.dispatch('updrive/UPDATE_COMPANY', company)
            }
        }
    }
</script>