export default {
    'contacts/CONTACTS' (state, data) {
        state.contacts = data
    },

    'contacts/FILTER' (state, data) {
        localStorage.setItem(`contacts.filter`, data)

        state.page = 1
        state.filter = data
    },

    'contacts/RECORDS' (state, data) {
        state.records = data
    },

    'contacts/PAGE' (state, data) {
        state.page = data
    },
}