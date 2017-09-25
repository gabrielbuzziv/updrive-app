<template>
    <el-switch
            v-model="hasPermission"
            on-text=""
            off-text="">
    </el-switch>
</template>

<script type="text/babel">
    import services from '../../services'

    export default {
        props: {
            permission: String,
            member: Object
        },

        data () {
            return {
                memberData: {
                    permissions: []
                }
            }
        },

        computed: {
            hasPermission: {
                get () {
                    return this.member.permissions.indexOf(this.permission) > -1
                },

                set (hasPermission) {
                    this.togglePermission()
                    return hasPermission
                }
            }
        },

        methods: {
            togglePermission () {
                const user = this.member.id
                const permission = this.permission

                services.togglePermission(user, permission)
                        .then(response => {
                            this.member.permissions = response.data
                        })
                        .catch(() => {
                            const error = this.$store.getters['global/GET_REQUEST_ERROR']
                            this.$message.error(error.error.message)
                        })
            }
        },
    }
</script>
