<template>
    <panel class="first-time">
        <h3 class="title">
            <i class="mdi icon margin-right-5" :class="`mdi-${icon}`" v-if="icon"></i>
            {{ title }}
        </h3>

        <p class="message" v-if="message">{{ message }}</p>

        <ul class="advantages" v-if="advantages.length">
            <li v-for="advantage in advantages">
                <i class="mdi mdi-check-circle margin-right-5"></i>
                {{ advantage }}
            </li>
        </ul>

        <div class="buttons" v-if="$slots.buttons">
            <slot name="buttons"></slot>
        </div>
    </panel>
</template>

<script type="text/babel">
    export default {
        props: {
            icon: String,

            title: {
                type: String,
                required: true
            },

            message: String,

            advantages: {
                type: Array,
                default () { return [] }
            }
        }
    }
</script>
