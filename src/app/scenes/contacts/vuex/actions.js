import services from '../services'

export default {
    'contacts/FETCH_ALL' (context) {
        const params = {
            filter: context.state.filter,
            page: context.state.page,
        }

        return services.fetchContacts(params)
            .then(response => {
                context.commit('contacts/RECORDS', response.data.total)
                context.commit('contacts/CONTACTS', response.data.items)
            })
    }
}