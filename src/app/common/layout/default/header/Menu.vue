<template>
    <div class="header-menu">
        <ul class="nav menu">
            <notifications v-if="userCan('manage-core')" />
            <user-menu />
        </ul>
    </div>
</template>

<script type="text/babel">
    import Notifications from './Notifications'
    import UserMenu from './UserMenu'

    export default {
        components: { Notifications, UserMenu },
    }
</script>