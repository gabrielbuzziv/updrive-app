export default {

    /**
     * @returns {*}
     */
    getTotal () {
        return window.axios.get(`companies/total`)
    },

    /**
     * @param params
     * @returns {*}
     */
    fetchCompanies (params = {}) {
        return window.axios.get(`/companies`, { params })
    },

    /**
     * @param id
     * @returns {*}
     */
    fetchContacts (query) {
        const params = { filter: query }
        return window.axios.get(`/contacts`, { params })
    },

    /**
     * @param id
     * @returns {*}
     */
    find (id) {
        return window.axios.get(`/companies/${id}`)
    },

    /**
     * @param id
     * @returns {*}
     */
    getContacts (id, query = null) {
        const params = { query: query }

        return window.axios.get(`/companies/${id}/contacts`, { params })
    },

    /**
     * @param action
     * @param data
     * @returns {*}
     */
    save (action, data) {
        return window.axios.post(action, data)
    },

    /**
     * @param items
     * @returns {*}
     */
    delete (items) {
        const params = {
            items: items,
            _method: 'delete'
        }

        return window.axios.post(`/companies`, params)
    },

    /**
     * @param cep
     * @returns {*}
     */
    searchAddress (cep) {
        return window.axios.get(`http://api.postmon.com.br/v1/cep/${cep}`)
    },

    /**
     * @param id
     * @returns {*}
     */
    getMonthlyOpenedDocuments (id) {
        return window.axios.get(`/companies/${id}/monthly-opened-documents`)
    },

    /**
     * @param company
     * @param contact
     * @returns {*|AxiosPromise}
     */
    addContact (company, data) {
        return window.axios.post(`/contacts/${company}/add`, data)
    },

    /**
     * @param company
     * @param contact
     * @returns {*|AxiosPromise}
     */
    revokeContact (company, contact) {
        return window.axios.post(`/contacts/${company}/${contact}/revoke`)
    },

    /**
     * @param data
     * @returns {*|AxiosPromise}
     */
    import (data) {
        return window.axios.post('/companies/import', data)
    }
}