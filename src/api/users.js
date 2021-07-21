
const usersDb = require('../database/users_pg')

/**
* API layer bridging the POST user route and database
 * Any security / permission checks would live here
 * @returns Id of the user created/modified
 */
const createUser = async ({
  email,
  familyName,
  givenName
} = {}) => {
  // caller.hasPermissionToCreate()
  if (!email || !familyName || !givenName) {
    console.log(`Incorrect data passed: ${email} ${familyName} ${givenName}`)
    return {
      error: 'BAD REQUEST'
    }
  }
  // TODO: check if user with email (also a unique entry) exists in db, if so throw an error

  const id = await usersDb.createUser({ email, familyName, givenName })
  console.log(`Created user with id: ${JSON.stringify(id)}`)
  return {
    id
  }
}

/**
 * API layer bridging the get route and database
 * Any security / permission checks would live here
 * @param userId - the id of the user to get
 * @returns the user object
 */
const readUser = async (userId) => {
  // caller.hasPermissionToGet()

  if (!userId) {
    console.log('Invalid userId')
    return {
      error: 'BAD REQUEST'
    }
  }
  const user = await usersDb.readUser(userId)
  if (!user) {
    console.log(`No user with id: ${userId}, found in Db`)
    return {
      error: 'NOT FOUND'
    }
  }

  console.log(`Found user with id ${userId}`)
  return {
    user
  }
}

/**
 * API layer bridging the delete route and database
 * Any security / permission checks would live here
 * @param userId - the id of the user to delete
 * @returns the user object
 */
 const deleteUser = async (userId) => {
  // caller.hasPermissionToDelete()

  if (!userId) {
    console.log('Invalid userId')
    return {
      error: 'BAD REQUEST'
    }
  }
  await usersDb.deleteUser(userId)

  console.log(`Deleted user: ${userId}`)
}

module.exports = {
  createUser,
  deleteUser,
  readUser
}
