import services from '../services'
import { debounce } from 'lodash'

export default {
    'updrive/UPDATE_COMPANY' (context, request) {
        context.commit('updrive/PAGE', 1)
        context.commit('updrive/COMPANY', request)
        context.dispatch('updrive/FETCH_PENDINGS')
        context.dispatch('updrive/FETCH_ALL')
        context.dispatch('updrive/GET_AMOUNTS')
    },

    'updrive/FETCH_PENDINGS' (context) {
        const company = context.state.company

        return services.getPending(company)
            .then(response => {
                context.commit('updrive/PENDINGS', response.data.items)
            })
    },

    'updrive/FETCH_ALL' (context) {
        const request = {
            company: context.state.company,
            query: context.state.documents_query,
            status: context.state.documents_status,
            page: context.state.page,
        }

        return services.getDocuments(request)
            .then(response => {
                context.commit('updrive/RECORDS', response.data.total)
                context.commit('updrive/DOCUMENTS', response.data.items)

                return response
            })
    },

    'updrive/GET_AMOUNTS' (context) {
        const company = context.getters['updrive/GET_COMPANY']

        return services.getAmounts(company)
            .then(response => {
                context.commit('updrive/PENDINGS_AMOUNT', response.data.pendings)
                context.commit('updrive/DOCUMENTS_AMOUNT', response.data.documents)
            })
    },

    'updrive/UPDATE_DOCUMENTS_QUERY': debounce(function (context, request) {
        context.commit('updrive/DOCUMENTS_QUERY', request)
        context.dispatch('updrive/FETCH_ALL')
    }, 300),

    'updrive/UPDATE_DOCUMENTS_STATUS' (context, request) {
        context.commit('updrive/DOCUMENTS_STATUS', request)
        context.dispatch('updrive/FETCH_ALL')
    }
}
