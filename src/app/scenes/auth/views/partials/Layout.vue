<template>
    <div class="signwrapper auth">
        <div class="sigin-overlay"></div>
        <div class="signpanel">
            <transition name="fade">
                <div v-show="loaded">
                    <div class="panel panel-lg signin" :class="{ 'panel-group' : header }">
                        <div class="panel-heading" v-if="header">
                            <h1>{{ title }}</h1>
                        </div>

                        <div class="panel-body">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <Toast />
    </div>
</template>

<script type="text/babel">
    import { Toast } from 'common/components'

    export default {
        props: {
            title: {
                type: String,
                default: ''
            },

            header: {
                type: Boolean,
                default: true
            }
        },

        components: { Toast },

        data () {
            return {
                loaded: false
            }
        },

        mounted () {
            this.loaded = true
        }
    }
</script>