export default {
    'reports/REPORT' (state, data) {
        state.report = data
    },

    'reports/REPORTS' (state, data) {
        state.reports = data
    },

    'reports/PAGE' (state, data) {
        state.page = data
    },

    'reports/RECORDS' (state, data) {
        state.records = data
    },

    'results/REPORT' (state, data) {
        state.result_report = data
    },

    'results/RESULT' (state, data) {
        state.result = data
    },

    'results/RESULTS' (state, data) {
        state.results = data
    },

    'results/PAGE' (state, data) {
        state.results_page = data
    },

    'results/RECORDS' (state, data) {
        state.results_records = data
    },
}