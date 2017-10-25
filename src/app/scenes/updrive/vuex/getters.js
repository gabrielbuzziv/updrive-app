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
    },

    'updrive/GET_TAGS' ({ tags }) {
        return tags
    },

    'tracking/GET_TRACKING' ({ tracking }) {
        return tracking
    },

    'tracking/GET_PAGE' ({ tracking_page }) {
        return tracking_page
    },

    'tracking/GET_RECORDS' ({ tracking_records }) {
        return tracking_records
    }
}