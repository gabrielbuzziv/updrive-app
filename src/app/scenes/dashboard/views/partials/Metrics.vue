<template>
    <panel class="dashboard-metric">
        <section>
            <i class="mdi icon" :class="icon"></i>

            <div class="info">
                <span class="title">{{ title }}</span>
                    <span class="metric">
                    <slot>{{ metric }}</slot>
                </span>
            </div>
        </section>
    </panel>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },

            icon: {
                type: String,
                required: true
            },

            metric: {
                type: Number
            }
        },
    }
</script>