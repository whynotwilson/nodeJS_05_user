const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

// GET // logout 登出
router.get('/', checkLogin, function (req, res, next) {
  // 清空 session 中用戶信息
  req.session.user = null
  req.flash('success', '成功登出')

  // 登出成功後跳轉到首頁
  res.redirect('/')
})

module.exports = router
