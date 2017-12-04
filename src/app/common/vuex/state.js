export default {
    status: true,
    account: {},
    sidebar: localStorage.getItem('sidebar') || true,
    axios_queue: 0,
    submiting: false,
    validation_error: {},
    request_error: {},
    notifications: []
}
