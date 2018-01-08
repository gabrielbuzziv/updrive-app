<template>
    <div class="page">
        <layout-header />
        <section>
            <layout-nav />
            <layout-content>
                <router-view></router-view>
            </layout-content>
        </section>

        <slot name="modal"></slot>

        <layout-notice />
    </div>
</template>

<script type="text/babel">
    import LayoutHeader from './header/Main'
    import LayoutNav from './Nav'
    import LayoutContent from './Content'
    import LayoutNotice from './Notice'

    export default {
        components: {
            LayoutHeader,
            LayoutNav,
            LayoutContent,
            LayoutNotice
        },
    }
</script>