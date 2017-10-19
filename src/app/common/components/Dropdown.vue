<template>
    <div class="dropdown" :class="{ 'open': open }">
        <button :class="btnClass" @click.prevent="toggle" @blur="close" ref="dropdownButton">
            <slot name="button"></slot>
        </button>

        <transition name="dropdown">
            <div class="dropdown-menu" :class="{ 'dropdown-menu-right': right }" v-show="open">
                <slot name="items"></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            buttonClass: String,
            right: {
                type: Boolean,
                default: false
            }
        },

        data () {
            return {
                open: false
            }
        },

        computed: {
            btnClass () {
                if (this.buttonClass) {
                    return [this.buttonClass, 'dropdown-toggle']
                }

                return ['btn', 'btn-primary', 'dropdown-toggle']
            }
        },

        methods: {
            toggle () {
                this.open = ! this.open

                if (this.open) {
                    this.$emit('open')
                }
            },

            close () {
//                setTimeout(() => this.open = false, 200)
            }
        },
    }
</script>
