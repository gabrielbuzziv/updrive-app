import Login from './views/Login'
import ForgotPassword from './views/ForgotPassword'
import ResetPassword from './views/ResetPassword'
import Register from './views/Register'

export default [
    { path: '/login', component: Login, name: 'auth.login', meta:{ auth: false } },
    { path: '/esqueci-minha-senha', component: ForgotPassword, name: 'auth.password.forgot', meta:{ auth: false } },
    { path: '/resetar-senha', component: ResetPassword, name: 'auth.password.reset', meta:{ auth: false } },
    { path: '/registrar', component: Register, name: 'auth.register', meta:{ auth: false } }
]