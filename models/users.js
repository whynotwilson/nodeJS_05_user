const User = require('../lib/mongo').User

module.exports = {
  // 註冊一個用戶
  create: function create (user) {
    return User.create(user)
  },

  // 根據帳號取得用戶資料
  getUserByAccount: function getUserByAccount (account) {
    return User
      .find({ account: account })
      .exec()
  },

  updateDataByAccount: function updateDataByAccount (account, user) {
    return User
      .update({account: account}, user, function (err) {
        console.log(err)
      })
      .exec()
  }
}
