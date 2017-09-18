export default {
    'global/GET_SIDEBAR' ({ sidebar }) {
        if (typeof sidebar == 'string') {
            return sidebar === 'true'
        }

        return sidebar
    },

    'global/IS_AXIOS_QUEUEING' ({ axios_queue }) {
        return !! axios_queue
    },

    'global/GET_SUBMITING' ({ submiting }) {
        return submiting
    },

    'global/GET_VALIDATION_ERROR' ({ validation_error }) {
        return validation_error
    },

    'global/GET_TOASTS' ({ toasts }) {
        return toasts
    }
}
