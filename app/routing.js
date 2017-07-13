'use strict'

const USERS_MODEL = require('./models/users')

/**
 * Read the incomming request and pass the request according to the specific model task
 * Acting as controller but actually just routing to pass
 *
 * @param request
 */
module.exports = request => {
  const MTH = request.method
  const WTH = request.what
  // const PRC = request.process   // Comment out so our standard wont complaint

  if (MTH === 'GET' && WTH === 'list_user') {
    return USERS_MODEL.getListOfUsers()
      .then(users => {
        // Massage the data if you would like to do so
        return users
      })
  } else {
    return new Promise(resolve => {
      resolve({
        status: 404,
        msg: 'We cannot understand the incomming task :('
      })
    })
  }
}
