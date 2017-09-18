<template>
    <div>
        <span class="company">
            <a href="#" @click.prevent="setCompany(document.company.id)">
                <i class="mdi mdi-domain margin-right-5"></i>
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