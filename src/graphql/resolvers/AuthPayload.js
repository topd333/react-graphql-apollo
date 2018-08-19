function user(root, args, { models }) {
  return models.User.findOne({ _id: root.user._id })
}

module.exports = {
  user
}