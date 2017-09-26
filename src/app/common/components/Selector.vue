<template>
    <div class="selector" :class="{ 'with-options': visibleOptions.length }">
        <label class="selector-tags">
            <div class="selector-tags__tag" v-for="tag, index in tags">
                {{ tag.label }}
                <a href="#" class="remove" @click.prevent="removeTag(index)">
                    <i class="mdi mdi-close"></i>
                </a>
            </div>
            <input v-model="tag"
                   class="selector-tag__input"
                   :disabled="overLimit"
                   @keydown.8="removeLastTag"
                   @keydown.9="addTag"
                   @keydown.13.prevent="addTag"
                   @keydown.188.prevent="addTag"
                   @keydown.down.prevent="navigateOptions('next')"
                   @keydown.up.prevent="navigateOptions('prev')"
            />
        </label>

        <div class="selector-options" v-if="visibleOptions.length">
            <div class="selector-options__option"
                 :class="{ 'hover': hoverIndex == index }"
                 @click.stop="addTag"
                 v-for="option, index in visibleOptions">
                <slot :option="option">
                    {{ option[optionLabel] }}
                </slot>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import { debounce, isEmpty } from 'lodash'

    export default {
        props: {
            value: Array,
            options: Array,
            limit: Number,
            optionValue: String,
            optionLabel: String,
            filterMethod: Function,
            validationMethod: Function
        },

        data () {
            return {
                selectorOptions: [],
                tag: '',
                tags: [],
                hoverIndex: 0
            }
        },

        computed: {
            overLimit () {
                if (this.tags && this.tags.length) {
                    return this.limit ? this.tags.length >= this.limit : false
                }

                return false
            },

            visibleOptions () {
                return this.selectorOptions.filter(option => option.visible)
            }
        },

        watch: {
            options () {
                this.selectorOptions = this.options
            },

            value (val) {
                this.tags = val
                this.$emit('change', val)
            },

            tag (val) {
                if (typeof this.filterMethod === 'function') {
                    this.filterMethod(val)
                } else {
                    this.filterDefault()
                }
            }
        },

        methods: {
            filterDefault () {
                this.selectorOptions = this.options.map(option => {
                    const tag      = this.tag.toLowerCase()
                    const label    = option[this.optionLabel].toLowerCase()
                    option.visible = label.indexOf(tag) > - 1 && tag.length ? true : false

                    return option
                })
            },

            addTag () {
                if (this.tag.length) {
                    if (this.visibleOptions.length) {
                        const tag = this.visibleOptions[this.hoverIndex]
                        this.tags.push({ value: tag[this.optionValue], label: tag[this.optionLabel] })
                    } else {
                        if (typeof this.validationMethod === 'function' && !this.validationMethod(this.tag)) {
                            return false;
                        }

                        const tag = this.tag.replaceAll(',', '').replaceAll('\n', '')
                        this.tags.push({ value: tag, label: tag })
                    }
                }

                this.tag        = ''
                this.hoverIndex = 0
            },

            navigateOptions (direction) {
                if (! this.visibleOptions.length) {
                    return;
                }

                if (direction === 'next') {
                    this.hoverIndex ++

                    if (this.hoverIndex === this.visibleOptions.length) {
                        this.hoverIndex = 0
                    }

                    if (! this.visibleOptions[this.hoverIndex].visible) {
                        this.navigateOptions('next')
                    }
                }

                if (direction === 'prev') {
                    this.hoverIndex --

                    if (this.hoverIndex < 0) {
                        this.hoverIndex = this.visibleOptions.length - 1;
                    }

                    if (! this.visibleOptions[this.hoverIndex].visible) {
                        this.navigateOptions('prev')
                    }
                }
            },

            removeLastTag () {
                if (this.tag.length == 0 && ! isEmpty(this.tags)) {
                    const index = this.tags.length - 1
                    this.tags.splice(index, 1)
                }
            },

            removeTag (index) {
                this.tags.splice(index, 1)
            },

            parseSlotContent () {
                return this.$slots.default.text
            }
        },

        mounted () {
            this.tags = this.value
            this.$root.$on('filter::options', () => setTimeout(() => this.filterDefault(), 1))
        },

        beforeDestroy () {
            this.$root.$off('filter::options')
        }
    }
</script>