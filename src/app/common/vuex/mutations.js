export default {
    'global/SIDEBAR' (state, data) {
        localStorage.setItem('sidebar', data)
        state.sidebar = data
    },

    'global/AXIOS_QUEUE_INCREMENT' (state, data) {
        state.axios_queue += data
    },

    'global/AXIOS_QUEUE_DECREMENT' (state, data) {
        if (state.axios_queue > 0) {
            state.axios_queue -= data
        }
    },

    'global/SUBMITING' (state, data) {
        state.submiting = data
    },

    'global/VALIDATION_ERROR' (state, data) {
        state.validation_error = data
    },

    'global/REQUEST_ERROR' (state, data) {
        state.request_error = data
    },

    'global/TOASTS' (state, data) {
        state.toasts = data
    }
}
