export default {
    'settings/MEMBERS' (state, data) {
        state.members = data
    },

    'settings/FILTER' (state, data) {
        localStorage.setItem(`settings.members.filter`, data)
        state.filter = data
    },
}