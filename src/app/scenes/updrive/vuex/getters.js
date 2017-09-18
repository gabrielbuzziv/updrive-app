export default {
    'updrive/GET_COMPANY' ({ company }) {
        return company
    },

    'updrive/GET_PENDINGS' ({ pendings }) {
        return pendings
    },

    'updrive/GET_ALL' ({ documents }) {
        return documents
    },

    'updrive/GET_AMOUNTS' ({ pendings_amount, documents_amount }) {
        return {
            pendings: pendings_amount,
            documents: documents_amount
        }
    },

    'updrive/GET_DOCUMENTS_TOTAL' ({ documents_total }) {
        return documents_total
    },

    'updrive/GET_DOCUMENTS_QUERY' ({ documents_query }) {
        return documents_query
    },

    'updrive/GET_DOCUMENTS_STATUS' ({ documents_status }) {
        return documents_status
    },

    'updrive/GET_PAGE' ({ page }) {
        return page
    },

    'updrive/GET_RECORDS' ({ records }) {
        return records
    }
}