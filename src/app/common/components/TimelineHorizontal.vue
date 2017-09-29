<template>
    <ul class="timeline-horizontal">
        <li class="item" :class="{ 'complete': item.complete }" v-for="item in items">
            <div class="timestamp">
                <span class="author">{{ item.author }}</span>
                <span class="date">{{ item.date }}</span>
            </div>
            <div class="event">
                <h4>{{ item.event }}</h4>
            </div>
        </li>
    </ul>
</template>

<script type="text/babel">
    export default {
        props: ['items'],
    }
</script>
