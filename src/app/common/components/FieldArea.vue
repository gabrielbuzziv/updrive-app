<template>
    <div class="fieldarea">
        <div class="icon">
            <i class="mdi" :class="`mdi-${icon}`"></i>
        </div>

        <div class="fields">
            <slot name="preview" v-if="preview"></slot>

            <a href="#" class="more-anchor margin-top-20" @click.prevent="toggle" v-if="preview && collapse">
                {{ label }} <i class="mdi mdi-chevron-down"></i>
            </a>

            <a href="#" class="field-anchor" @click.prevent="toggle" v-if="! preview">
                {{ label }} <i class="mdi mdi-chevron-down"></i>
                <span class="opcional" v-if="optional">(opcional)</span>
            </a>

            <transition name="fieldset">
                <div class="hideFields margin-top-20" v-if="isOpen">
                    <slot></slot>
                </div>
            </transition>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            open: {
                type: Boolean,
                default: false
            },

            icon: {
                type: String,
                required: true
            },

            preview: {
                type: Boolean,
                default: false
            },

            collapse: {
                type: Boolean,
                default: true
            },

            label: {
                type: String,
                default: 'Exibir mais campos'
            },

            optional: {
                type: Boolean,
                default: true
            }
        },

        data () {
            return {
                isOpen: this.open
            }
        },

        watch: {
            open () {
                this.isOpen = this.open
            }
        },

        methods: {
            toggle () {
                this.isOpen = !this.isOpen
            }
        }
    }
</script>