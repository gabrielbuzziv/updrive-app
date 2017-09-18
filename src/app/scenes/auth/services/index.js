export default {

    /**
     * Request to API to authenticate the requested credentials.
     *
     * @param credentials
     * @returns {*}
     */
    authenticate (credentials) {
        return window.axios.post(`/auth`, credentials)
    },

    /**
     * Request to API to fetch the authenticated user data.
     *
     * @returns {*}
     */
    getUser () {
        const params = {
            include: 'roles,permissions,notifications'
        }

        return window.axios.post(`/auth/user`, params)
    },

    /**
     * Request to API to send a confirmation link to reset password.
     *
     * @param data
     * @returns {*}
     */
    requestNewPassword (data) {
        return window.axios.post(`/password/request`, data)
    },

    /**
     * Request to API to reset the password to the new one.
     *
     * @param data
     * @returns {*}
     */
    resetPassword (data) {
        return window.axios.post(`/password/reset`, data)
    },

    /**
     * @param email
     * @returns {*|AxiosPromise}
     */
    validateInvite (email) {
        return window.axios.post(`/users/validate-invite`, { email })
    },

    /**
     * @param id
     * @param data
     * @returns {*|AxiosPromise}
     */
    registerCollaborator (id, data) {
        return window.axios.post(`/users/register/${id}`, data)
    }
}