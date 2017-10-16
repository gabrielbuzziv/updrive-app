import Default from 'common/layout/default/Main'
import Authenticate from 'common/layout/authenticate/Main'
import { routes as auth } from './scenes/auth'
import { routes as companies } from './scenes/companies'
import { routes as contacts } from './scenes/contacts'
import { routes as updrive } from './scenes/updrive'
import { routes as settings } from './scenes/settings'
import { routes as dashboard } from './scenes/dashboard'

export default [
    {
        path: '/',
        component: Default,
        meta: { auth: true },
        children: [
            // {
            //     path: '/',
            //     redirect: { name: 'updrive' },
            //     meta: { auth: true },
            // },
            ...dashboard,
            ...companies,
            ...contacts,
            ...updrive,
            ...settings,
        ]
    },

    {
        path: '/',
        component: Authenticate,
        meta: { auth: true },
        children: [
            ...auth
        ]
    },
]