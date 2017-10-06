import services from '../services'

export default {
    /**
     * Attempt to authenticated the requested credentials
     * and return a access token.
     *
     * @param context
     * @param request
     * @returns {*}
     */
    'auth/ON_LOGIN' (context, request) {
        const credentials = {
            email: request.email,
            password: request.password
        }

        return services.authenticate(credentials)
            .then(response => {
                context.commit('auth/TOKEN', response.data.token)
            })
    },

    /**
     * Revoke the token from user client
     * and clean the localStorage data.
     *
     * @param context
     */
    'auth/ON_LOGOUT' (context) {
        context.commit('auth/TOKEN', '')
        context.commit('auth/USER', '')

        localStorage.clear()
    },

    /**
     * Fetch the authenticated user.
     *
     * @param context
     * @returns {*}
     */
    'auth/FETCH_USER' (context) {
        return services.getUser()
            .then(response => {
                context.commit('auth/TOKEN', response.data.token)
                context.commit('auth/USER', response.data.user)

                return response
            })
    }

}