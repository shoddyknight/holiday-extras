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

const createUser = async ({
  email,
  familyName,
  givenName
}) => {
  console.log('Creating user')

  const query = `INSERT INTO ${tableName} (email, familyname, givenname) VALUES ($1, $2, $3)`;
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

module.exports = {
  createUser,
  deleteUser,
  readUser
}
