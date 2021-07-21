const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const tableName = 'users'

const readUser = async (userId) => {
  console.log('Reading user')
  await client.connect()

  const user = await client.query(`SELECT * FROM ${tableName} WHERE userId = ${userId}`);

  await client.end()

  return user
}

const createUser = async ({
  email,
  familyName,
  givenName
}) => {
  console.log('Creating user')
  await client.connect()

  const id = await client.query(`INSERT INTO ${tableName} (email, familyName, givenName)
    VALUES (${email}, ${familyName}, ${givenName})`)

  await client.end()

  return id
}

const deleteUser = async (userId) => {
  console.log('Deleting user')
  await client.connect()

  const user = await client.query(`DELETE * FROM ${tableName} WHERE userId = ${userId}`);

  await client.end()
}

module.exports = {
  createUser,
  readUser
}
