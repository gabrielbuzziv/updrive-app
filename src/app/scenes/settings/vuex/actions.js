import services from '../services'

export default {
    'settings/FETCH_MEMBERS' (context) {
        const params = { filter: context.state.filter, }

        return services.fetchMembers(params)
            .then(response => context.commit('settings/MEMBERS', response.data.items))
    }
}