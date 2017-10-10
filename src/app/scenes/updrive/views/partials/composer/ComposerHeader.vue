<template>
    <header class="composer-header">
        <h3 class="title">{{ title }}</h3>

        <div class="options">
            <button @click.prevent="toggle">
                <i class="mdi mdi-window-minimize" v-if="open"></i>
                <i class="mdi mdi-window-maximize" v-else></i>
            </button>

            <!--<button @click.prevent="toggleFullscreen">-->
                <!--<i class="mdi mdi-arrow-collapse" v-if="fullscreen"></i>-->
                <!--<i class="mdi mdi-arrow-expand" v-else></i>-->
            <!--</button>-->

            <button @click.prevent="close">
                <i class="mdi mdi-window-close"></i>
            </button>
        </div>
    </header>
</template>

<script>
    export default {
        props: ['title', 'open', 'fullscreen', 'visible'],

        methods: {
            toggle () {
                this.$emit('update:open', ! this.open)

                if (this.open) {
                    this.$emit('update:fullscreen', false)
                }
            },

            toggleFullscreen () {
                this.$emit('update:fullscreen', ! this.fullscreen)
            },

            close () {
                this.$emit('update:visible', false)
            }
        }
    }
</script>