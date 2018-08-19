const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, { models }) {
  const saltRounds = 10
  const hash = await bcrypt.hash(args.password, 10)
  const salt = await bcrypt.genSaltSync(saltRounds)

  const newUser = new models.User({ ...args, hash, salt })

  try {
    await newUser.save()
  } catch(e) {
    throw new Error(e)
  }

  const token = jwt.sign({ userId: newUser._id }, APP_SECRET)

  return {
    token,
    newUser,
  }
}

async function login(parent, args, { models }) {
  const user = await models.User.findOne({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.hash)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}

module.exports = {
  signup,
  login
}