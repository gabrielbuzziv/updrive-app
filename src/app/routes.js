import Default from 'common/layout/default/Main'
import Authenticate from 'common/layout/authenticate/Main'
import { routes as auth } from './scenes/auth'
import { routes as companies } from './scenes/companies'
import { routes as contacts } from './scenes/contacts'
import { routes as updrive } from './scenes/updrive'
import { routes as settings } from './scenes/settings'
import { routes as dashboard } from './scenes/dashboard'
import { routes as reports } from './scenes/reports'

export default [
    {
        path: '/',
        component: Default,
        meta: { auth: true },
        children: [
            ...dashboard,
            ...companies,
            ...contacts,
            ...updrive,
            ...settings,
            ...reports,
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