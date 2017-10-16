export default {
    'global/FETCH_ACCOUNT' (context, request) {
        window.axios.get(`/account`)
            .then(response => {
                context.commit('global/ACCOUNT', response.data)
            })
    },

    'global/SET_SIDEBAR' (context, request) {
        context.commit('global/SIDEBAR', request)
    },

    'global/UPDATE_AXIOS_QUEUE' (context, request) {
        if (request == 'increment') {
            context.commit('global/AXIOS_QUEUE_INCREMENT', 1)
        } else {
            context.commit('global/AXIOS_QUEUE_DECREMENT', 1)
        }
    },

    'global/SET_FILTER' (context, request) {
        context.commit(`${request.namespace}/FILTER`, request.value)
    },

    'global/SET_PAGE' (context, request) {
        context.commit(`${request.namespace}/PAGE`, request.value)
    },

    'global/SET_SUBMITING' (context, request) {
        context.commit('global/SUBMITING', request)
    },

    'global/SET_VALIDATION_ERROR' (context, request) {
        context.commit('global/VALIDATION_ERROR', request)
    },

    'global/SET_REQUEST_ERROR' (context, request) {
        context.commit('global/REQUEST_ERROR', request)
    },
}
