<template>
    <div class="notification">
        <div class="content">
            <h4>{{ title }}</h4>
            <p>{{ description }}</p>
        </div>
        <!--<el-switch v-model="isChecked" on-color="#1aa71c" on-text="" off-text="" @change="toggle" />-->
        askdop
    </div>
</template>

<script>
    import services from '../../services'

    export default {
        props: ['title', 'description', 'notification', 'checked'],

        data () {
            return {
                isChecked: false
            }
        },

        watch: {
            checked () {
                this.isChecked = this.checked
            }
        },

        methods: {
            toggle () {
//                services.toggleNotificationSettings(this.notification)
//                    .then(response => {
//                        console.log(response.data)
//                    })
            }
        }
    }
</script>