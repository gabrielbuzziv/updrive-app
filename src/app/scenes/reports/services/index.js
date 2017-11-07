import Helper from 'common/Helper'

export default {
    submitReport (action, data) {
        return window.axios.post(action, data)
    },

    getReportsById (id, params) {
        return window.axios.get(`reports/${id}`, { params })
    },

    findReport (id) {
        return window.axios.get(`reports/${id}/show`)
    },

    getStatusReport (id, params) {
        return window.axios.get(`reports/${id}/status/`, { params })
    },

    fetchCompanies () {
        return window.axios.get(`companies`, { params: { limit: 9999 } })
    },

    fetchSenders () {
        return window.axios.get(`users`)
    },
}