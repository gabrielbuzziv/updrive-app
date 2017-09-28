import io from 'socket.io-client'

let SOCKET_HOST = process.env.SOCKET_HOST && process.env.SOCKET_HOST.length
    ? process.env.SOCKET_HOST
    : `//${window.location.hostname}`

let SOCKET_PORT = process.env.SOCKET_PORT && process.env.SOCKET_PORT.length
    ? `:${process.env.SOCKET_PORT}`
    : ''

window.socket = io(`${SOCKET_HOST}${SOCKET_PORT}`)