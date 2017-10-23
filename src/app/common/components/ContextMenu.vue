<template>
    <div class="contextmenu">
        <div class="contextmenu-target" @contextmenu.prevent="handleShow">
            <slot name="target">
                <button class="btn btn-default">
                    Context menu Target
                </button>
            </slot>
        </div>

        <transition name="fade">
            <div class="contextmenu-options"
                 tabindex="-1"
                 ref="contextmenu"
                 v-show="optionsVisible"
                 :style="optionsPosition"
                 @blur="handleHide">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                optionsVisible: false,
                optionsPosition: {
                    top: `0px`,
                    left: `0px`
                }
            }
        },

        methods: {
            handleShow (e) {
                this.optionsVisible = true

                Vue.nextTick(() => {
                    this.$refs.contextmenu.focus()
                    this.setMenuPosition(e.y, e.x)
                })

            },

            handleHide () {
                this.optionsVisible = false
            },

            setMenuPosition (top, left) {
                this.optionsPosition = { top: `${top}px`, left: `${left}px` }
            }
        },

        mounted () {
            document.body.appendChild(this.$refs.contextmenu)
        }
    }
</script>