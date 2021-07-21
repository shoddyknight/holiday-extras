const sinon = require('sinon')

const {
  createUser,
  getUser
} = require('../../src/api/users')

/**
 * Imported so it can be stubbed by sinon sandbox
 */
const usersDb = require('../../src/database/users_pg')

const sandbox = sinon.createSandbox()

beforeEach(() => {
  sandbox.stub(usersDb, 'createUser')
  sandbox.stub(usersDb, 'getUser')
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
      sandbox.assert.notCalled(usersDb.getUser)
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
      sandbox.assert.notCalled(usersDb.getUser)
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
      sandbox.assert.notCalled(usersDb.getUser)
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
      sandbox.stub(usersDb, 'createUser').returns(2)
      sandbox.stub(usersDb, 'getUser')
      const actual = await createUser(params)

      sandbox.assert.calledOnce(usersDb.createUser)
      sandbox.assert.notCalled(usersDb.getUser)

      expect(actual).toMatchObject({
        id: 2
      })
    })
  })
})

describe('getUser', () => {
  describe('when no id is supplied', () => {
    const params = null

    test('it should return BAD REQUEST', async () => {
      const actual = await getUser(params)

      expect(actual).toMatchObject({
        error: 'BAD REQUEST'
      })
      sandbox.assert.notCalled(usersDb.createUser)
      sandbox.assert.notCalled(usersDb.getUser)
    })
  })

  describe('when a valid userId is passed', () => {
    const params = 0

    test('then a user is returned from the database', async () => {
      const user = {
        userId: 0,
        email: 'hello@world',
        givenName: 'Hello',
        familyName: 'World',
        created: '2021-12-06T04:30:000Z'
      }

      sandbox.restore()
      sandbox.stub(usersDb, 'createUser')
      sandbox.stub(usersDb, 'getUser').returns(user)

      const actual = await getUser(params)

      sandbox.assert.calledOnce(usersDb.getUser)
      sandbox.assert.notCalled(usersDb.createUser)

      expect(actual).toMatchObject({ user })
    })
  })
})
