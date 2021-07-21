const express = require('express')

const users = require('./users')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())


/**
 * Home to test express connectivity
 */
app.get('/', (req, res) => {
  // TODO: return README or Swagger spec
  res.send('Hello Holiday Extras world!')
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

  const user = await users.getUser(userId);

  res.send(user)
})

/**
 * Add a user
 */
app.post('/user', async (req, res) => {
  console.log(`POST /user Request params: ${JSON.stringify(req.params)}`)

  const createdUserId = await users.createUser(req.params)

  res.send(createdUserId)
})
