const express = require('express')
const router = express.Router()

// 登入寫完再改
router.get('/', function (req, res, next) {
  const email = req.session.user.email
  const avatar = 'img/' + req.session.user.avatar

  res.render('member', {img: avatar, email: email})
})

module.exports = router
