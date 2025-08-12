import { io } from 'socket.io-client'

const VITE_PORT = import.meta.env.VITE_PORT || 3001

const socket = io(`http://localhost:${VITE_PORT}`)

export default socket