export default {
    'auth/IS_LOGGED' ({ token }) {
        return token
    },

    'auth/GET_USER' ({ user }) {
        let isJSON = true

        try { JSON.parse(user) } catch (e) { isJSON = false }

        if (isJSON) {
            user = JSON.parse(user)
        }

        return user
    }
}