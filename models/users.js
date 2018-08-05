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

  // 更新資料
  editDataByAccount: function updateDataByAccount (account, email) {
    return User
      .update({'account': account}, {'email': email})
      .exec()
  },

  // 更新頭像
  editAvatarByAccount: function updateDataByAccount (account, newAvatar) {
    return User
      .update({'account': account}, {'avatar': newAvatar})
      .exec()
  }

}
