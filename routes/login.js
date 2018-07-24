const express = require('express')
const router = express.Router()
const checkNotLogin = require('../middlewares/check').checkNotLogin

router.get('/', checkNotLogin, function (req, res, next) {
  res.render('login')
})

router.post('/', function (req, res, next) {

})

module.exports = router
