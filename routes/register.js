var User = require('../models/users')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('register')
})

router.post('/', function (req, res, next) {
  var user = new User({
    account: req.fields.account,
    password: req.fields.password,
    repassword: req.fields.repassword,
    birthday: req.fields.birthday,
    email: req.fields.email
  })
  // const avatar = req.files

  console.log(req.fields)
  console.log(user)

  // ==========================================
  // 參考用，暫時不知道
  // const avatar = req.files.avatar.path.split(path.sep).pop()
  // 暫時不知道意思

  // console.log('圖片： ' + avatar)

  // 將 user 寫入資料庫(save)
  // user.save(function (err, res) {
  //   if (err) {
  //     console.log('Error: ' + err)
  //   } else {
  //     console.log('Res: ' + res)
  //   }
  // })

  res.redirect('/')
})

module.exports = router
