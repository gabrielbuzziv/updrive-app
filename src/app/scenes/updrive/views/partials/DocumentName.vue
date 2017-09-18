<template>
    <span class="name">
        <el-tooltip :content="note" placement="top-start" v-if="hasNote" popper-class="name-popper">
            <span>{{ name }} <i class="mdi mdi-comment-processing margin-left-5"></i></span>
        </el-tooltip>

        <span v-else>{{ name }}</span>
    </span>
</template>

<script type="text/babel">
    import { isEmpty } from 'lodash'

    export default {
        props: ['document'],

        computed: {
            name () {
                return this.document.name
            },

            note () {
                return this.document.note
            },

            hasNote () {
                if (isEmpty(this.note)) {
                    return false
                }

                return true
            }
        }
    }
</script>
