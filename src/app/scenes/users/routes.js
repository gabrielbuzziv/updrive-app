import List from './views/List'

export default [
    {
        path: '/colaboradores',
        component: List,
        name: 'users',
        meta: { breadcrumb: 'Colaboradores', auth: true, permission: 'manage-users' }
    },
]