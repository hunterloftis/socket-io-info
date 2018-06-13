'use strict'

const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const path = require('path')

const PORT = process.env.PORT || 3000
const INDEX = path.join(__dirname, 'index.html')

const app = express()
  .use((req, res) => res.sendFile(INDEX))

const server = http.createServer(app)

const io = socketIO(server)
  .on('connection', (socket) => {
    console.log('Client connected')
    socket.emit('name', process.env.DYNO || 'unknown')
    socket.on('disconnect', () => console.log('Client disconnected'))
  })

server.listen(PORT, () => console.log(`Listening on ${PORT}`))