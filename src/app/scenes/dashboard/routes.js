import Dashboard from './views/Dashboard'

export default [
    {
        path: '/',
        component: Dashboard,
        name: 'dashboard',
        meta: { breadcrumb: 'Dashboard', auth: true },

    },
]