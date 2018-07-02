const User = require('../lib/mongo.js').User

module.exports = {
  // 註冊一個會員
  create: function create (user) {
    console.log(user.create)
    return User.create(user).exec()
  }
}
