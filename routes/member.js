const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

// 登入寫完再改
router.get('/', checkLogin, function (req, res, next) {
  const email = req.session.user.email
  const avatar = 'img/' + req.session.user.avatar
  const user = req.session.user
  res.render('member', {img: avatar, email: email, user: user})
})

module.exports = router
