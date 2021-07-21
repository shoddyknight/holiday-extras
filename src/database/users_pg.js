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
  
})

module.exports = {
  getUser
}
