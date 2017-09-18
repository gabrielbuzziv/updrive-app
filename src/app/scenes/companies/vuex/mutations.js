export default {
    'companies/COMPANIES' (state, data) {
        state.companies = data
    },

    'companies/CONTACTS' (state, data) {
        state.contacts = data
    },

    'companies/FILTER' (state, data) {
        localStorage.setItem(`companies.filter`, data)

        state.page = 1
        state.filter = data
    },

    'companies/RECORDS' (state, data) {
        state.records = data
    },

    'companies/PAGE' (state, data) {
        state.page = data
    }
}