const express = require('express')
const path = require('path')

const users = require('./api/users')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())

/**
 * Home to test express connectivity
 */
app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, './swagger-page')
  })
})

/**
 * Setup express listener
 */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/**
 * Get a user
 */
app.get('/user/:userId', async (req, res) => {
  console.log(`GET /user/:userId Request params: ${JSON.stringify(req.params)}`)
  const {
    params: {
      userId = ''
    } = {}
  } = req

  try {
    const {
      error,
      user
    } = await users.readUser(userId)

    if (error) {
      handleError(error, res)
    } else {
      res.status(200).json(user)
    }
  } catch (e) {
    console.log(`Unhandled error; ${e.message}`)
    res.status(500).send('Internal error')
  }
})

/**
 * Delete a user
 */
app.delete('/user/:userId', async (req, res) => {
  console.log(`DELETE /user/:userId Request params: ${JSON.stringify(req.params)}`)
  const {
    params: {
      userId = ''
    } = {}
  } = req

  try {
    const {
      error
    } = await users.deleteUser(userId)

    if (error) {
      handleError(error, res)
    } else {
      res.status(202).send(userId)
    }
  } catch (e) {
    console.log(`Unhandled error; ${e.message}`)
    res.status(500).send('Internal error')
  }
})

/**
 * Get users
 */
app.get('/user', async (req, res) => {
  try {
    const foundUsers = await users.getUsers()

    res.status(200).send(foundUsers)
  } catch (e) {
    console.log(`Unhandled error; ${e.message}`)
    res.status(500).send('Internal error')
  }
})

/**
 * Add a user
 */
app.post('/user', async (req, res) => {
  console.log(`POST /user Request body: ${JSON.stringify(req.body)}`)

  try {
    const {
      error,
      id: createdUserId
    } = await users.createUser(req.body)

    if (error) {
      handleError(error, res)
    } else {
      res.status(201).send(createdUserId)
    }
  } catch (e) {
    console.log(`Unhandled error; ${e.message}`)
    res.status(500).send('Internal error')
  }
})

/**
 * Update a user
 */
app.put('/user', async (req, res) => {
  console.log(`Put /user Request body: ${JSON.stringify(req.body)}`)

  try {
    const {
      error,
      user: updatedUser
    } = await users.updateUser(req.body)

    if (error) {
      handleError(error, res)
    } else {
      res.status(202).send(updatedUser)
    }
  } catch (e) {
    console.log(`Unhandled error; ${e.message}`)
    res.status(500).send('Internal error')
  }
})

const handleError = (error, res) => {
  switch (error) {
    case 'BAD REQUEST':
      res.status(400).send(error)
      return
    case 'NOT FOUND':
      res.status(404).send(error)
      return
    case 'NOT MODIFIED':
      res.status(304).send('Use PUT to modify this resource instead of POST')
      return
    default:
      res.status(500).send('Internal error')
  }
}
