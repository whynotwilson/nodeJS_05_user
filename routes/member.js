const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const UserModel = require('../models/users')
const path = require('path')
const fs = require('fs')

// GET /member 會員頁
router.get('/', checkLogin, function (req, res, next) {
  const email = req.session.user.email
  const avatar = 'img/' + req.session.user.avatar
  const user = req.session.user
  res.render('member', {img: avatar, email: email, user: user})
})

// GET /member/edit  更新會員資料頁面
router.get('/dataEdit', checkLogin, function (req, res, next) {
  const email = req.session.user.email
  const avatar = 'img/' + req.session.user.avatar
  const user = req.session.user
  res.render('member-data-edit', {img: avatar, email: email, user: user})
})

// POST /member/edit  執行更新會員資料
router.post('/dataEdit', checkLogin, function (req, res, next) {
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

  const account = req.session.user.account

  UserModel.editDataByAccount(account, email)
    .then(function () {
      req.flash('success', '資料更新成功')
      res.redirect('back')
    })
    .catch(next)
})

// GET /member/avatarEdit 更新頭像頁面
router.get('/avatarEdit', checkLogin, function (req, res, next) {
  const email = req.session.user.email
  const avatar = '/img/' + req.session.user.avatar
  const user = req.session.user
  res.render('member-avatar-edit', {img: avatar, email: email, user: user})
})

// POST /member/avatarEdit 執行更新頭像
router.post('/avatarEdit', checkLogin, function (req, res, next) {
  var oldAvatar = __dirname.split(path.sep) // 取得目前路徑並切割成 array
  oldAvatar.pop()
  // 取得舊頭像的路徑
  oldAvatar = oldAvatar.join('/') + '/public/img/' + req.session.user.avatar

  const newAvatar = req.files.avatar.path.split(path.sep).pop()
  const account = req.session.user.account

  // 檢查參數
  try {
    if (!newAvatar.length) {
      throw new Error('請選擇頭像')
    }
  } catch (e) {
    req.flash('error', e.message)
    res.redirect('back')
  }

  UserModel.editAvatarByAccount(account, newAvatar)
    .then(function () {
      req.flash('success', '頭像更新成功')
      req.session.user.avatar = newAvatar // 更新 session 資訊
      fs.unlink(oldAvatar) // 刪除舊頭像
      res.redirect('back')
    })
    .catch(next)
})

module.exports = router
