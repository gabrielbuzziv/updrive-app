export default {
    'companies/GET_ALL' ({ companies }) {
        return companies
    },

    'companies/GET_CONTACTS' ({ contacts }) {
        return contacts
    },

    'companies/GET_FILTER' ({ filter }) {
        return filter
    },

    'companies/GET_RECORDS' ({ records }) {
        return records
    },

    'companies/GET_PAGE' ({ page }) {
        return page || localStorage.getItem('companies.page')
    }
}