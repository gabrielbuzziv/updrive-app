import { vuex as auth } from './scenes/auth'
import { vuex as companies } from './scenes/companies'
import { vuex as contacts } from './scenes/contacts'
import { vuex as updrive } from './scenes/updrive'
import { vuex as settings } from './scenes/settings'
import { vuex as dashboard } from './scenes/dashboard'

export default {
    auth,
    dashboard,
    companies,
    contacts,
    updrive,
    settings
}