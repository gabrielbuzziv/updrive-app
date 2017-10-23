<template>
    <selector class="field"
              v-model="value"
              option-value="id"
              option-label="email"
              :options="options"
              :filter-method="filterMethod"
              :validation-method="validationMethod">

        <template slot="tags" scope="data">
            <context-menu v-for="option, index in data.options" :key="index">
                <template slot="target">
                    <div class="selector-tags__tag">
                        {{ option.label }}
                        <a href="#" class="remove" @click.prevent="data.options.splice(index, 1)">
                            <i class="mdi mdi-close"></i>
                        </a>
                    </div>
                </template>

                <ul>
                    <li>
                        <a href="#">
                            <i class="mdi mdi-label margin-right-5"></i>
                            Marcar como
                            <i class="mdi mdi-chevron-right with-childrens"></i>
                        </a>

                        <ul>
                            <li v-for="tag in tags" :key="tag.id">
                                <a href="#" @click.prevent="markAs(option, tag)">
                                    <i class="mdi mdi-label margin-right-5"></i>
                                    {{ tag.name }}

                                    <i class="mdi mdi-check-circle checked" v-if="hasTag(option, tag)"></i>
                                </a>
                            </li>

                            <li class="divider"></li>

                            <li>
                                <a href="#">
                                    <i class="mdi mdi-plus margin-right-5"></i>
                                    Adicionar marcação
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" @click.prevent="data.options.splice(index, 1)">
                            <i class="mdi mdi-delete margin-right-5"></i>
                            Remover
                        </a>
                    </li>
                </ul>
            </context-menu>
        </template>

        <template scope="data">
            <div class="option-image">
                <img :src="data.option.links.gravatar" alt="">
            </div>

            <div class="option-info">
                <b>{{ data.option.name }}</b>
                <span>{{ data.option.email }}</span>
            </div>
        </template>
    </selector>
</template>

<script>
    export default {
        props: ['options', 'filterMethod', 'validationMethod', 'value'],

        computed: {
            tags () {
                return this.$store.getters['updrive/GET_TAGS']
            }
        },

        methods: {
            markAs(option, tag) {
                if (option.options && option.options.tags) {
                    if (option.options.tags.indexOf(tag.id) > -1) {
                        const index = option.options.tags.indexOf(tag.id)
                        option.options.tags.splice(index, 1)
                    } else {
                        option.options.tags.push(tag.id)
                    }
                } else {
                    option.options.tags = [tag.id]
                }
            },

            hasTag (option, tag) {
                if (option.options && option.options.tags) {
                    return option.options.tags.indexOf(tag.id) > -1
                }
            }
        },
    }
</script>