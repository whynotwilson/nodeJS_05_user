var User = require('../models/users')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.send('register 頁面')
})

// router.post('/', function (req, res, next) {
//   var user = new User({
//     name: req.body.name,
//     birthday: req.body.birthday,
//     email: req.body.email
//   })

//   // 將 user 寫入資料庫(save)
//   user.save(function (err, res) {
//     if (err) {
//       console.log('Error: ' + err)
//     } else {
//       console.log('Res: ' + res)
//     }
//   })

//   res.redirect('/')

//   測試 x-www-form-urlencoded
// })

// 測試 bodyParser
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({extend: false})
router.post('/', urlencodedParser, function (req, res, next) {
  console.log(req.body)
  res.redirect('/')
})

module.exports = router
