export default {
    sidebar: localStorage.getItem('sidebar') || true,
    axios_queue: 0,
    submiting: false,
    validation_error: {},
    toasts: []
}
