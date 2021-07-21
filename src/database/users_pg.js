const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const tableName = 'users'

const readUser = async (userId) => {
  console.log('Reading user')

  const id = Number.parseInt(userId)

  const query = `SELECT * FROM ${tableName} WHERE userid = $1`
  console.log(`Query: ${query}`)

  const res = await pool.query(query, [id])
  const {
    rows = []
  } = res

  return rows[0]
}

const getUserByEmail = async (email) => {
  console.log('Getting user by email')

  const query = `SELECT * FROM ${tableName} WHERE email = $1`
  console.log(`Query: ${query}`)

  const res = await pool.query(query, [email])
  const {
    rows = []
  } = res

  return rows[0]
}

const createUser = async ({
  email,
  familyName,
  givenName
}) => {
  console.log('Creating user')

  const query = `INSERT INTO ${tableName} (email, familyname, givenname) VALUES ($1, $2, $3)`
  console.log(`Query: ${query}`)

  const id = await pool.query(query, [email, familyName, givenName])

  return id
}

const deleteUser = async (id) => {
  console.log('Deleting user')

  const query = `DELETE FROM ${tableName} WHERE userid = $1`
  console.log(`Query: ${query}`)

  return await pool.query(query, [id])
}

const updateUser = async ({
  userId,
  email, 
  familyName,
  givenName
}) => {
  console.log('Updating user')
  let query = `UPDATE ${tableName}
    SET`

  if (email) {
    query += ` email = ${email}`
  }

  if (familyName) {
    query += ` familyname = ${familyName}`
  }

  if (givenName) {
    query += ` givenname = ${givenName}`
  }

  query += `WHERE userid = ${userId}`

  console.log(`Query: ${query}`)

  await pool.query(query)

  return readUser(userId)
}

module.exports = {
  createUser,
  deleteUser,
  getUserByEmail,
  readUser,
  updateUser
}
