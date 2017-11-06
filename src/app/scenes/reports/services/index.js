import Helper from 'common/Helper'

export default {
    submitReport (action, data) {
        return window.axios.post(action, data)
    },

    getReportsById (id) {
        return window.axios.get(`reports/${id}`)
    },

    findReport (id) {
        return window.axios.get(`reports/${id}/show`)
    },

    getStatusReport (id) {
        return window.axios.get(`reports/${id}/status/`)
    },

    fetchCompanies () {
        return window.axios.get(`companies`, { params: { limit: 9999 } })
    },

    fetchSenders () {
        return window.axios.get(`users`)
    },
}