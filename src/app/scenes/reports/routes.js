import Reports from './Reports'
import General from './views/General'
import Sent from './views/Sent'

export default [
    {
        path: '/relatorios',
        component: Reports,
        meta: { breadcrumb: 'Relatórios', auth: true, permission: 'manage-core' },
        children: [
            {
                path: '/relatorios',
                component: General,
                name: 'reports',
                meta: { auth: true, permission: 'manage-core' }
            },
            {
                path: '/relatorios/relatorio-documentos-enviados',
                component: Sent,
                name: 'reports.sent',
                meta: { auth: true, permission: 'manage-core' }
            },
        ]
    }
]