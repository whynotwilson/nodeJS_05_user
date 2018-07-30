const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

// GET /member 會員頁
router.get('/', checkLogin, function (req, res, next) {
  const email = req.session.user.email
  const avatar = 'img/' + req.session.user.avatar
  const user = req.session.user
  res.render('member', {img: avatar, email: email, user: user})
})

router.post('/data-update', checkLogin, function (req, res, next) {

})

module.exports = router
