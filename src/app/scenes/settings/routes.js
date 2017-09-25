import Settings from './views/Settings'
import Profile from './views/Profile'
import Account from './views/Account'
import Members from './views/Members'

export default [
    {
        path: '/configuracoes',
        component: Settings,
        name: 'settings',
        redirect: { name: 'settings.profile' },
        meta: { breadcrumb: 'Configurações', auth: true },
        children: [
            {
                path: '/configuracoes/meus-dados',
                component: Profile,
                name: 'settings.profile',
                meta: { breadcrumb: 'Meus Dados', auth: true }
            },
            {
                path: '/configuracoes/conta',
                component: Account,
                name: 'settings.account',
                meta: { breadcrumb: 'Conta', auth: true, permission: 'manage-account' }
            },
            {
                path: '/configuracoes/membros',
                component: Members,
                name: 'settings.members',
                meta: { breadcrumb: 'Membros', auth: true, permission: 'manage-users' }
            },
        ]
    },
]