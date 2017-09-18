export default {
    'updrive/COMPANY' (state, data) {
        localStorage.setItem('updrive.company', data)
        state.company = data
    },

    'updrive/PENDINGS' (state, data) {
        state.pendings = data
    },

    'updrive/PENDINGS_AMOUNT' (state, data) {
        state.pendings_amount = data
    },

    'updrive/DOCUMENTS' (state, data) {
        state.documents = data
    },

    'updrive/DOCUMENTS_AMOUNT' (state, data) {
        state.documents_amount = data
    },

    'updrive/DOCUMENTS_TOTAL' (state, data) {
        state.documents_total = data
    },

    'updrive/DOCUMENTS_QUERY' (state, data) {
        localStorage.setItem('updrive.documents.query', data)
        state.documents_query = data
    },

    'updrive/DOCUMENTS_STATUS' (state, data) {
        localStorage.setItem('updrive.documents.status', data)
        state.documents_status = data
    },

    'updrive/PAGE' (state, data) {
         state.page = data
    },

    'updrive/RECORDS' (state, data) {
         state.records = data
    }
}