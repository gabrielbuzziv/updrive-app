export default {

    /**
     * @returns {*}
     */
    getTotal () {
        return window.axios.get(`/contacts/total`)
    },

    /**
     * @param params
     * @returns {*}
     */
    fetchContacts (params = {}) {
        return window.axios.get(`/contacts`, { params })
    },

    /**
     * @returns {*}
     */
    fetchCompanies (query) {
        const params = {
            filter: query,
            limit: 9999
        }

        return window.axios.get(`/companies`, { params })
    },

    /**
     * @param id
     * @returns {*}
     */
    find (id) {
        return window.axios.get(`/contacts/${id}`)
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

        return window.axios.post(`/contacts`, params)
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
    getCompanies (id) {
        return window.axios.get(`/contacts/${id}/companies`)
    },

    /**
     * @param id
     */
    getMonthlyOpenedDocuments (id) {
        return window.axios.get(`/contacts/${id}/monthly-opened-documents`)
    },

    /**
     * @param id
     * @returns {*|AxiosPromise}
     */
    activate (id) {
        return window.axios.post(`/contacts/${id}/activate`)
    },

    /**
     * @param id
     * @returns {*|AxiosPromise}
     */
    deactivate (id) {
        return window.axios.post(`/contacts/${id}/deactivate`)
    },

    /**
     * @param data
     * @returns {*|AxiosPromise}
     */
    import (data) {
        return window.axios.post('/contacts/import', data)
    }
}