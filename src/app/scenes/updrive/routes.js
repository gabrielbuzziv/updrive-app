import UPDrive from './UPDrive'
import Pending from './views/Pending'
import Documents from './views/Documents'
import Emails from './views/Emails'

export default [
    {
        path: '/updrive',
        component: UPDrive,
        name: 'updrive',
        redirect: { name: 'updrive.documents' },
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
            },
            {
                path: '/updrive/emails',
                component: Emails,
                name: 'updrive.emails',
                meta: { breadcrumb: 'E-mails', auth: true, permission: 'manage-updrive' }
            }
        ]
    }
]