import Default from 'common/layout/default/Main'
import Authenticate from 'common/layout/authenticate/Main'
import { routes as auth } from './scenes/auth'
import { routes as users } from './scenes/users'
import { routes as companies } from './scenes/companies'
import { routes as contacts } from './scenes/contacts'
import { routes as updrive } from './scenes/updrive'

export default [
    {
        path: '/',
        component: Default,
        meta: { auth: true },
        children: [
            {
                path: '/',
                redirect: { name: 'updrive' },
                meta: { auth: true },
            },
            ...companies,
            ...contacts,
            ...updrive,
            ...users,
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