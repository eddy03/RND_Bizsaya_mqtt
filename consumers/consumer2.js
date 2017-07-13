'use strict'

/**
 * This will be the application that will sending a request and received the response
 *
 */

// Add required library
const moment = require('moment')

const connector = require('./connector')

const message = {
  method: 'GET',
  what: 'list_user',
  process: 'Give me the list of users',
  ac: moment().unix()
}

let interval1 = setInterval(() => {
  console.time('sending')
  connector.request(message)
    .then(response => {
      console.timeEnd('sending')
      console.log('response ', response)
    })
    .catch(err => {
      clearInterval(interval1)
      console.error('Error ', err)
    })
}, 5000)
