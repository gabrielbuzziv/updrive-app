export default {
    'contacts/GET_ALL' ({ contacts }) {
        return contacts
    },

    'contacts/GET_FILTER' ({ filter }) {
        return filter
    },

    'contacts/GET_RECORDS' ({ records }) {
        return records
    },

    'contacts/GET_PAGE' ({ page }) {
        return page || localStorage.getItem('contacts.page')
    }
}