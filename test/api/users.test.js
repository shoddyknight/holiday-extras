const sinon = require('sinon')

const {
  createUser,
  readUser
} = require('../../src/api/users')

/**
 * Imported so it can be stubbed by sinon sandbox
 */
const usersDb = require('../../src/database/users_pg')

const sandbox = sinon.createSandbox()

beforeEach(() => {
  sandbox.stub(usersDb, 'createUser')
  sandbox.stub(usersDb, 'readUser')
})

afterEach(() => {
  sandbox.restore()
})

describe('createUser', () => {
  describe('when no email is supplied', () => {
    const params = {
      email: '',
      givenName: 'Hello',
      familyName: 'World'
    }

    test('it should return BAD REQUEST', async () => {
      const actual = await createUser(params)

      expect(actual).toMatchObject({
        error: 'BAD REQUEST'
      })
      sandbox.assert.notCalled(usersDb.createUser)
      sandbox.assert.notCalled(usersDb.readUser)
    })
  })

  describe('when no givenName is supplied', () => {
    const params = {
      email: 'hello@world',
      givenName: '',
      familyName: 'World'
    }

    test('it should return BAD REQUEST', async () => {
      const actual = await createUser(params)

      expect(actual).toMatchObject({
        error: 'BAD REQUEST'
      })
      sandbox.assert.notCalled(usersDb.createUser)
      sandbox.assert.notCalled(usersDb.readUser)
    })
  })

  describe('when no familyName is supplied', () => {
    const params = {
      email: 'hello@world',
      givenName: 'Hello',
      familyName: ''
    }

    test('it should return BAD REQUEST', async () => {
      const actual = await createUser(params)

      expect(actual).toMatchObject({
        error: 'BAD REQUEST'
      })
      sandbox.assert.notCalled(usersDb.createUser)
      sandbox.assert.notCalled(usersDb.readUser)
    })
  })

  describe('when valid params are passed', () => {
    const params = {
      email: 'hello@world',
      givenName: 'Hello',
      familyName: 'World'
    }

    test('then a user is created in the database', async () => {
      sandbox.restore()
      sandbox.stub(usersDb, 'createUser').returns(Promise.resolve(2))
      sandbox.stub(usersDb, 'readUser')
      const actual = await createUser(params)

      sandbox.assert.calledOnce(usersDb.createUser)
      sandbox.assert.notCalled(usersDb.readUser)

      expect(actual).toMatchObject({
        id: 2
      })
    })
  })
})

describe('readUser', () => {
  describe('when no id is supplied', () => {
    const params = null

    test('it should return BAD REQUEST', async () => {
      const actual = await readUser(params)

      expect(actual).toMatchObject({
        error: 'BAD REQUEST'
      })
      sandbox.assert.notCalled(usersDb.createUser)
      sandbox.assert.notCalled(usersDb.readUser)
    })
  })

  describe('when a valid userId is passed', () => {
    const params = 1

    test('then a user is returned from the database', async () => {
      const user = {
        userId: 1,
        email: 'hello@world',
        givenName: 'Hello',
        familyName: 'World',
        created: '2021-12-06T04:30:000Z'
      }

      sandbox.restore()
      sandbox.stub(usersDb, 'createUser')
      sandbox.stub(usersDb, 'readUser').returns(Promise.resolve(user))

      const actual = await readUser(params)

      sandbox.assert.calledOnce(usersDb.readUser)
      sandbox.assert.notCalled(usersDb.createUser)

      expect(actual).toMatchObject({ user })
    })
  })
})
