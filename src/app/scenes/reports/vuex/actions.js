import services from '../services'

export default {
    'reports/FETCH_ALL' (context) {
        const id = context.state.report
        const params = { page: context.state.page }

        services.getReportsById(id, params)
            .then(response => {
                context.commit('reports/RECORDS', response.data.total)
                context.commit('reports/REPORTS', response.data.items)
            })
    },

    'results/FETCH_ALL' (context) {
        const id = context.state.result
        const report = context.state.result_report
        const params = { page: context.state.results_page }

        switch (report) {
            case 1:
                return services.getStatusReport(id, params)
                    .then(response => {
                        context.commit('results/RECORDS', response.data.total)
                        context.commit('results/RESULTS', response.data.items)
                    })
        }
    }
}