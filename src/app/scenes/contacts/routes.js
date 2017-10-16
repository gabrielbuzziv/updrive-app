import Contacts from './Contacts'
import List from './views/List'
import Create from './views/Create'
import Edit from './views/Edit'
import Details from './views/details/Details'
import DetailsGeneral from './views/details/General'
import DetailsCompanies from './views/details/Companies'

export default [
    {
        path: '/contatos',
        component: Contacts,
        meta: { breadcrumb: 'Contatos', auth: true, permission: 'manage-core' },
        children: [
            {
                path: '/contatos',
                component: List,
                name: 'contacts.list',
                meta: { auth: true, permission: 'manage-core' }
            },
            {
                path: '/contatos/novo',
                component: Create,
                name: 'contacts.create',
                meta: { breadcrumb: 'Adicionar Novo', auth: true, permission: 'manage-core' }
            },
            {
                path: '/contatos/:id/editar',
                component: Edit,
                name: 'contacts.edit',
                meta: { breadcrumb: 'Editar', auth: true, permission: 'manage-core' }
            },
            {
                path: '/contatos/:id/detalhes',
                component: Details,
                name: 'contacts.details',
                redirect: { name: 'contacts.details.general' },
                meta: { breadcrumb: 'Detalhes', auth: true, permission: 'manage-core' },
                children: [
                    {
                        path: '/contatos/:id/detalhes',
                        component: DetailsGeneral,
                        name: 'contacts.details.general',
                        meta: { auth: true, permission: 'manage-core' },
                    },
                    {
                        path: '/contatos/:id/detalhes/empresas',
                        component: DetailsCompanies,
                        name: 'contacts.details.companies',
                        meta: { breadcrumb: 'Empresas', auth: true, permission: 'manage-core' },
                    },
                ]
            },
        ]
    }
]