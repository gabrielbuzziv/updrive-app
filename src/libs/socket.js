import io from 'socket.io-client'
const socket = io(`${process.env.SOCKET_HOST}:${process.env.SOCKET_PORT}`)

window.socket = socket