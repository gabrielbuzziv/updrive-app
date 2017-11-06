import Reports from './Reports'
import General from './views/General'
import Status from './views/Status'
import ReportStatus from './views/reports/Status'

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
                component: Status,
                name: 'reports.status',
                meta: { auth: true, permission: 'manage-core' }
            },
            {
                path: '/relatorios/relatorio-documentos-enviados/:id',
                component: ReportStatus,
                name: 'reports.status.result',
                meta: { auth: true, permission: 'manage-core' }
            },
        ]
    }
]