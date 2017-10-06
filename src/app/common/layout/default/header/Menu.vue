<template>
    <div class="header-menu">
        <ul class="nav menu">
            <notifications />
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