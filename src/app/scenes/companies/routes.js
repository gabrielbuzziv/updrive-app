import Companies from './Companies'
import List from './views/List'
import Create from './views/Create'
import Edit from './views/Edit'
import Details from './views/details/Details'
import DetailsGeneral from './views/details/General'
import DetailsContacts from './views/details/Contacts'

export default [
    {
        path: '/empresas',
        component: Companies,
        meta: { breadcrumb: 'Empresas', auth: true, permission: 'manage-companies' },
        children: [
            {
                path: '/empresas',
                component: List,
                name: 'companies.list',
                meta: { auth: true, permission: 'manage-companies' }
            },
            {
                path: '/empresas/nova',
                component: Create,
                name: 'companies.create',
                meta: { breadcrumb: 'Adicionar Nova', auth: true, permission: 'manage-companies' }
            },
            {
                path: '/empresas/:id/editar',
                component: Edit,
                name: 'companies.edit',
                meta: { breadcrumb: 'Editar', auth: true, permission: 'manage-companies' }
            },
            {
                path: '/empresas/:id/detalhes',
                name: 'companies.details',
                redirect: { name: 'companies.details.general' },
                component: Details,
                meta: { breadcrumb: 'Detalhes', auth: true, permission: 'manage-companies' },
                children: [
                    {
                        path: '/empresas/:id/detalhes',
                        component: DetailsGeneral,
                        name: 'companies.details.general',
                        meta: { auth: true, permission: 'manage-companies' },
                    },
                    {
                        path: '/empresas/:id/detalhes/contatos',
                        component: DetailsContacts,
                        name: 'companies.details.contacts',
                        meta: { breadcrumb: 'Colaboradores', auth: true, permission: 'manage-companies' },
                    }
                ]
            },
        ]
    }
]