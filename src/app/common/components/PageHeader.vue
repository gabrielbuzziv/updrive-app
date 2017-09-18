<template>
    <div id="page-header">
        <div class="top">
            <div class="left">
                <div class="header">
                    <h2 class="title">
                        <span v-if="href">
                            <route :href="href">{{ title }}</route>
                        </span>
                        <span v-else>{{ title }}</span>
                    </h2>

                    <span class="children" v-if="$slots.children">
                        <i class="mdi mdi-chevron-right margin-right-10 divider"></i>
                        <span class="inline">
                            <slot name="children"></slot>
                        </span>
                    </span>

                    <span class="children" v-if="!$slots.children && children">
                        <i class="mdi mdi-chevron-right margin-right-10 divider"></i>
                        <h3>{{ children }}</h3>
                    </span>
                </div>

                <div class="slot-left">
                    <slot name="left"></slot>
                </div>
            </div>

            <div class="right">
                <slot name="right"></slot>
            </div>

            <div class="clearfix"></div>
        </div>

        <div class="nav" v-if="$slots['nav']">
            <ul>
                <slot name="nav"></slot>
            </ul>
        </div>

        <div class="clearfix"></div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            title: String,
            children: String,
            href: String
        }
    }
</script>