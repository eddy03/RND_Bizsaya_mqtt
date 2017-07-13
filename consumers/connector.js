'use strict'

/**
 * Connector will define how we going to connect with MQTT server and some of the required params
 *
 */

const Promise = require('bluebird')
const randomstring = require('randomstring')
const moment = require('moment')
const mqtt = require('mqtt')

module.exports.request = requestMessage => {
  return new Promise((resolve, reject) => {
    const client = mqtt.connect('mqtt://localhost', { keepalive: 120 })
    const TOPIC = randomstring.generate(5) + moment().unix() + randomstring.generate(5)   // Generate random topic to publish
    const RESTOPIC = `$${TOPIC}Res`   // Define response topic to be listen. Must have $ so our app server not listening back to the response topic
    client.on('connect', () => {
      client.subscribe(RESTOPIC)    // Listen to the response from app server
      requestMessage.topic_response = RESTOPIC     // Tell app server to publish using this topic
      requestMessage.ac = moment().unix()
      client.publish(TOPIC, JSON.stringify(requestMessage))    // Send our request to app server
    })
    client.on('message', (topic, message) => {
      client.end()      // Close this connected when we received the response from app server
      resolve(JSON.parse(message.toString()))     // Return response promise back to our application
    })

    // Some other events to be listen
    client.on('reconnect', () => console.log('Begin reconnecting back to the server...'))
    client.on('offline', () => console.log('Server is offline.'))
    client.on('error', err => {
      reject(err)
    })
  })
}
