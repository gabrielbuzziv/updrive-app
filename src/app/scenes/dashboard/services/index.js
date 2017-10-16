export default {
    getOverview (interval) {
        return window.axios.get(`/dashboard/overview`, { params: { interval } })
    },

    /**
     * @param filter
     * return @
     */
    getPendingDocuments (filter = null) {
        return window.axios.get(`/dashboard/pending-documents`, { params: { filter } })
    },

    /**
     * return @
     */
    getMetrics () {
        return window.axios.get(`/dashboard/metrics`)
    }
}