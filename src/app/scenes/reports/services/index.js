import Helper from 'common/Helper'

export default {
    fetchReportSent (filters) {
        return window.axios.get(`reports/sent`, { params: { ...filters }})
    },

    fetchCompanies () {
        return window.axios.get(`companies`, { params: { limit: 9999 } })
    },

    fetchSenders () {
        return window.axios.get(`users`)
    }
}