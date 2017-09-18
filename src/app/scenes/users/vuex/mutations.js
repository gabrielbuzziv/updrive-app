export default {
    'users/USERS' (state, data) {
        state.users = data
    },

    'users/FILTER' (state, data) {
        localStorage.setItem(`users.filter`, data)

        state.page = 1
        state.filter = data
    },

    'users/RECORDS' (state, data) {
        state.records = data
    },

    'users/PAGE' (state, data) {
        state.page = data
    },
}