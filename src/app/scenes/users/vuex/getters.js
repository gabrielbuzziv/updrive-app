export default {
    'users/GET_ALL' ({ users }) {
        return users
    },

    'users/GET_FILTER' ({ filter }) {
        return filter
    },

    'users/GET_RECORDS' ({ records }) {
        return records
    },

    'users/GET_PAGE' ({ page }) {
        return page || localStorage.getItem('users.page')
    }
}