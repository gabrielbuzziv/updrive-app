import { routes as app } from 'app'

const Notfound = [{ path: '*', redirect: '/' }]

export default [ ...app, ...Notfound ]