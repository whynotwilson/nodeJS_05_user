const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const UserModel = require('../models/users')

// GET /member 會員頁
router.get('/', checkLogin, function (req, res, next) {
  const email = req.session.user.email
  const avatar = 'img/' + req.session.user.avatar
  const user = req.session.user
  res.render('member', {img: avatar, email: email, user: user})
})

// GET /member/date-update  更新會員資料頁面
router.get('/:account/date-update', checkLogin, function (req, res, next) {
  const email = req.session.user.email
  const avatar = 'img/' + req.session.user.avatar
  const user = req.session.user
  res.render('member-data-updata', {img: avatar, email: email, user: user})
})

// POST /member/date-update  執行更新會員資料
router.post('/data-update', checkLogin, function (req, res, next) {
  const email = req.fields.email
  // 檢查參數
  try {
    if (!email.length) {
      throw new Error('請輸入email')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  const user = {
    email: email
  }

  const account = req.session.account
  UserModel.updateDataByAccount(account, user)
    .then(function (u) {
      console.log('u: ' + u)
    })
})

module.exports = router
