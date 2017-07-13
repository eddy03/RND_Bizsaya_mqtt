'use strict'

const mqtt = require('mqtt')
const moment = require('moment')
const _ = require('lodash')

const MQTT_OPTIONS = {
  keepalive: 120,
  clientId: 'model_server'
}
const client = mqtt.connect('mqtt://localhost', MQTT_OPTIONS)

const ROUTING = require('./app/routing')

client.on('connect', () => {
  console.log('[%s] - Connection establish. Subscribing to all topic', moment().toDate())
  client.subscribe('#')
})

client.on('message', (topic, message) => {
  const msg = JSON.parse(message.toString())

  // Validate the incomming information
  if (msg && _.has(msg, 'topic_response') && _.has(msg, 'what') && _.has(msg, 'process')) {
    ROUTING(msg)
      .then(response => res(msg, response))
      .catch(err => {
        console.error(err.toString())
        res(msg, {status: 500, msg: 'We encounter an error. Try again'})
        // What to do when we encounter error from tasks
      })
  }
})

client.on('reconnect', () => console.log('Trying to reconnect back to the broker'))
client.on('offline', () => console.log('Oppss.. Broker offline...'))
client.on('error', err => {
  console.error(err.toString())
  // What to do when we encounter error?
})

// Put inside helper
function res (msg, message) {
  client.publish(msg.topic_response, JSON.stringify(message))
}
