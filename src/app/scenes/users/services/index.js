export default {

    /**
     * @param params
     * @returns {*}
     */
    fetchUsers (params = {}) {
        return window.axios.get(`/users`, { params })
    },

    /**
     * @param action
     * @param data
     * @returns {*}
     */
    addUsers ( data) {
        return window.axios.post(`users`, data)
    },

    /**
     * @param params
     * @returns {*}
     */
    delete (items) {
        const params = {
            items: items,
            _method: 'delete'
        }

        return window.axios.post(`/users`, params)
    },
}