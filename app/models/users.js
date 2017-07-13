'use strict'

const Promise = require('bluebird')

/**
 * Contain all the model definition and logic
 *
 * @type {{}}
 */

let model = {}

model.getListOfUsers = () => {
  return new Promise(resolve => {
    let users = [{
      user: 'ali'
    }, {
      user: 'abu'
    }, {
      user: 'ah loy'
    }, {
      user: 'raju'
    }]
    resolve(users)
  })
}

module.exports = model
