import io from 'socket.io-client'

let SOCKET_HOST = process.env.SOCKET_HOST && process.env.SOCKET_HOST.length
    ? process.env.SOCKET_HOST
    : `//${window.location.hostname}`

window.socket = io(`${SOCKET_HOST}:${process.env.SOCKET_PORT}`)