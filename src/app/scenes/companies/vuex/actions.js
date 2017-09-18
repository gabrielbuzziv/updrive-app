import services from '../services'

export default {
    'companies/FETCH_ALL' (context) {
        const params = {
            filter: context.state.filter,
            page: context.state.page
        }

        return services.fetchCompanies(params)
            .then(response => {
                context.commit('companies/RECORDS', response.data.total)
                context.commit('companies/COMPANIES', response.data.items)
            })
    },

    'companies/FETCH_CONTACTS' (context, request) {
        return services.getContacts(request.company, request.query)
            .then(response => {
                context.commit('companies/CONTACTS', response.data.items)
            })
    }
}