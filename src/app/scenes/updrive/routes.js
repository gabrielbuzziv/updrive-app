import UPDrive from './UPDrive'
import Documents from './views/Documents'

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
                component: Documents,
                name: 'updrive.documents',
                meta: { breadcrumb: 'Documentos', auth: true }
            },
        ]
    }
]