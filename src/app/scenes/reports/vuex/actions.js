import services from '../services'

export default {
    /**
     * Report Status
     */
    'reports/FETCH_ALL' (context, request) {
        services.getReportsById(request)
            .then(response => {
                context.commit('reports/RECORDS', response.data.total)
                context.commit('reports/REPORTS', response.data.items)
            })
    }
}