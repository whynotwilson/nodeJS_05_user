const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin
const UserModel = require('../models/users')

router.get('/', checkNotLogin, function (req, res, next) {
  res.render('login')
})

router.post('/', checkNotLogin, function (req, res, next) {
  const account = req.fields.account
  const password = req.fields.password

  // 檢驗參數
  try {
    if (!account.length) {
      throw new Error('請輸入帳號')
    }
    if (!password.length) {
      throw new Error('請輸入密碼')
    }
  } catch (e) {
    req.flash('error', e.message)
    res.redirect('back')
  }

  UserModel.getUserByAccount(account)
    .then(function (user) {
      // model.find 回傳結果是一個 Array []，所以要把找到的第一個設成 user
      user = user[0]
      if (!user) {
        req.flash('error', '帳號不存在')
        return res.redirect('back')
      }

      console.log('user: ')
      console.log(user)

      // 檢查密碼是否匹配
      if (sha1(password) !== user.password) {
        console.log('sha1(password)')
        console.log(sha1(password))
        console.log('user.password')
        console.log(user.password)

        req.flash('error', '密碼不正確')
        return res.redirect('back')
      }

      req.flash('success', '登入成功')
      // 用戶訊息寫入 session
      delete user.password

      req.session.user = user
      res.redirect('member')
    })
})

module.exports = router
