const { Client } = require('pg')

const client = new Client()

const tableName = 'users'

const getUser = async (userId) => {
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
  await client.connect()

  const id = await client.query(`INSERT INTO ${tableName} (email, familyName, givenName)
    VALUES (${email}, ${familyName}, ${givenName})`)

  await client.end()

  return id
}

module.exports = {
  createUser,
  getUser
}
