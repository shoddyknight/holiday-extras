
const usersDb = require('../database/users_pg')

/**
* API layer bridging the POST user route and database
 * Any security / permission checks would live here
 * @returns Id of the user created/modified
 */
const createUser = ({
  email = '',
  familyName = '',
  givenName = ''
} = {}) => {
  // caller.hasPermissionToCreate()
  if (!email || !familyName || !givenName) {
    return {
      error: 'BAD REQUEST'
    }
  }
  // TODO: generate created time, add user to Db, return id

  // TODO: check if user with email (also a unique entry) exists in db, if so throw an error

  return {
    id: 1
  }
}

/**
 * API layer bridging the get route and database
 * Any security / permission checks would live here
 * @param userId - the id of the user to get
 * @returns the user object
 */
const getUser = async (userId) => {
  // caller.hasPermissionToGet()
  if (!userId) {
    return {
      error: 'BAD REQUEST'
    }
  }
  const user = usersDb.getUser(userId)
  if (!user) {
    return {
      error: 'NOT FOUND'
    }
  }

  return {
    user
  }
}

module.exports = {
  createUser,
  getUser
}
