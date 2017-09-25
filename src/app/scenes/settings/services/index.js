export default {

    /**
     * @param params
     * @returns {*}
     */
    fetchMembers (params = {}) {
        return window.axios.get(`/users`, { params })
    },

    /**
     * @param action
     * @param data
     * @returns {*}
     */
    inviteMembers (data) {
        return window.axios.post(`users`, data)
    },

    /**
     * @param params
     * @returns {*}
     */
    revoke (id) {
        const params = { _method: 'delete' }

        return window.axios.post(`/users/${id}`, params)
    },

    /**
     * @param id
     * @param permission
     * @returns {*|AxiosPromise}
     */
    togglePermission (id, permission) {
        return window.axios.post(`/users/${id}/permissions`, { permission })
    },

    /**
     * @param data
     * @returns {*|AxiosPromise}
     */
    updateDetails (data) {
        return window.axios.post(`/users/profile`, data)
    },

    /**
     * @param data
     * @returns {*|AxiosPromise}
     */
    updatePassword (data) {
        return window.axios.post(`/users/profile/password`, data)
    },

    /**
     * @returns {*}
     */
    getAccount () {
        return window.axios.get(`/account`)
    }
}