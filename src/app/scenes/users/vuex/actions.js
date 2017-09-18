import services from '../services'

export default {
    'users/FETCH_ALL' (context) {
        const params = {
            filter: context.state.filter,
            page: context.state.page,
        }

        return services.fetchUsers(params)
            .then(response => {
                context.commit('users/RECORDS', response.data.total)
                context.commit('users/USERS', response.data.items)
            })
    }
}