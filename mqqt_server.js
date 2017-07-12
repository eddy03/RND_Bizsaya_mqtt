'use strict'

const mosca = require('mosca')

const ascoltatore = {
  type: 'redis',
  redis: require('redis'),
  db: 12,
  port: 6379,
  return_buffers: true, // to handle binary payloads
  host: 'localhost'
};

const moscaSettings = {
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Redis
  }
};

const server = new mosca.Server(moscaSettings)
server.on('ready', () => console.log('Mosca server is up and running'))

server.on('clientConnected', client => {
  console.log('client connected', client.id)
})

// fired when a message is received
server.on('published', (packet, client) => {
  console.log('Published', packet.topic, packet.payload)
})