export default {
    'auth/TOKEN' (state, data) {
        localStorage.setItem('auth_token', data)
        state.token = data
    },

    'auth/USER' (state, data) {
        localStorage.setItem('auth_user', JSON.stringify(data))
        state.user = data
    }
}