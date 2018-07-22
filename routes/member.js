const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

router.get('/', function(req, res, next) {
  // req.flash('success', '註冊成功')
  res.render('member')
})

module.exports = router
