<template>
    <div id="composer" :class="{ 'fullscreen': isFullscreen }">
        <composer-header title="New document" fullscreen.sync="isFullscreen" :open.sync="isOpen" />

        <div class="composer-body" v-if="isOpen">
            Body2
        </div>
    </div>
</template>

<script>
    import ComposerHeader from './composer/ComposerHeader'

    export default {
        components: { ComposerHeader },

        data () {
            return {
                isFullscreen: false,
                isOpen: true
            }
        },
    }
</script>