export default {
    'global/GET_STATUS' ({ status }) {
        return status
    },

    'global/GET_ACCOUNT' ({ account }) {
        return account
    },

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

    'global/GET_REQUEST_ERROR' ({ request_error }) {
        return request_error
    },

    'global/GET_NOTIFICATIONS' ({ notifications }) {
        return notifications
    }
}
