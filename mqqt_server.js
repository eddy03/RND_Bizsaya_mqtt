'use strict'

const mosca = require('mosca')
const _ = require('lodash')
const moment = require('moment')

// Debugging?
const DEBUG = true

const ASCOLTATORE = {
  type: 'redis',
  redis: require('redis'),
  db: 12,
  port: 6379,
  return_buffers: true,
  host: 'localhost'
}
const MOSCA_SETTING = {
  port: 1883,
  backend: ASCOLTATORE,
  persistence: {
    factory: mosca.persistence.Redis
  }
}

// Store currently connected clients
let connectedClients = []

// Bootup the mosca MQTT server
const server = new mosca.Server(MOSCA_SETTING)

// When everything seem ready to received connection
server.on('ready', () => console.log('Mosca server is up and running'))

// During event client connected, What should we do?
server.on('clientConnected', newConnected)

// During event client disconnected, What should we do?
server.on('clientDisconnected', newDisconnected)

// When a packet received event, What should we do?
server.on('published', (packet, client) => {})

// What to do during connected client event
function newConnected (client) {
  connectedClients.push(client.id)
  connectedClients = _.uniq(connectedClients)
  cons('New connected client.')
}

// What to do during disconnected client event
function newDisconnected (client) {
  let index = connectedClients.indexOf(client.id)
  if (index !== -1) {
    connectedClients.splice(index, 1)
    cons('A client disconnected from our server.')
  }
}

function cons (msg) {
  if (DEBUG) {
    console.log(`[${moment().toDate()}] - ${msg} Current connected client is`, connectedClients.length)
  }
}
