export default {

    /**
     * @returns {*}
     */
    getTotal () {
        return window.axios.get(`/documents/total`)
    },

    /**
     * @returns {*}
     */
    getCompanies (query = '') {
        const params = {
            limit: 9999,
            filter: query
        }
        return window.axios.get(`updrive/companies`, { params })
    },

    /**
     * @returns {*}
     */
    getDocuments (request) {
        const params = request
        return window.axios.get(`updrive/documents`, { params })
    },

    /**
     * @param id
     * @returns {*}
     */
    getDocument (id) {
        return window.axios.get(`documents/${id}`)
    },

    /**
     * @param id
     * @returns {*}
     */
    getCompany (id) {
        return window.axios.get(`companies/${id}`)
    },

    /**
     * @param action
     * @param data
     * @returns {*|AxiosPromise}
     */
    saveDocument (action, data) {
        return window.axios.post(action, data)
    },

    /**
     * @param id
     * @returns {*|AxiosPromise}
     */
    removeDocument (id) {
        return window.axios.post(`documents/${id}`, { _method: 'delete' })
    },

    /**
     * @param company
     * @returns {*}
     */
    getCompanyContacts (company) {
        return window.axios.get(`companies/${company}/contacts`)
    },

    /**
     * @param company
     * @returns {*}
     */
    getContacts (filter) {
        const params = { filter }
        return window.axios.get(`contacts`, { params })
    },

    /**
     * @param data
     * @returns {*|AxiosPromise}
     */
    send (data) {
        return window.axios.post(`updrive/send`, data)
    },

    /**
     * @param documentId
     * @returns {*}
     */
    generateProtocol (documentId) {
        return window.axios.get(`updrive/${documentId}/protocol`)
    },

    /**
     * @returns {*}
     */
    getTags () {
        return window.axios.get(`tags`)
    },

    /**
     * @param tagName
     */
    createTag (tagName) {
        return window.axios.post(`tags`, { tag: tagName })
    },

    /**
     * @param id
     */
    getDispatchDetails (id) {
        return window.axios.get(`updrive/${id}/document-dispatch`)
    },

    /**
     * @param id
     */
    resendDocument (id, recipients = null) {
        return window.axios.post(`updrive/${id}/resend`, { recipients })
    }
}