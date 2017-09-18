import Vue from 'vue'

/**
 * Focus the element with the directive
 */
Vue.directive('focus', {
    inserted (el) {
        setTimeout(() => {
            el.focus()
        }, 1)
    }
})