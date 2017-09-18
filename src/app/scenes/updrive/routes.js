import UPDrive from './UPDrive'
import Pending from './views/Pending'
import Documents from './views/Documents'

export default [
    {
        path: '/updrive',
        component: UPDrive,
        name: 'updrive',
        redirect: { name: 'updrive.pending' },
        meta: { breadcrumb: 'UP Drive', auth: true } ,
        children: [
            {
                path: '/updrive',
                component: Pending,
                name: 'updrive.pending',
                meta: { breadcrumb: 'Pendentes', auth: true }
            },
            {
                path: '/updrive/documentos',
                component: Documents,
                name: 'updrive.documents',
                meta: { breadcrumb: 'Documentos', auth: true }
            }
        ]
    }
]