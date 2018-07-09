var User = require('../models/users')
const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', function (req, res, next) {
  res.render('register')
})

router.post('/', function (req, res, next) {
  const account = req.fields.account
  let password = req.fields.password
  // const avatar = req.files.avatar.path.split(path.sep).pop()
  const repassword = req.fields.repassword
  const birthday = req.fields.birthday
  const email = req.fields.email

  console.log(req.fields)

  // 檢查參數
  try {
    if (!(account.length < 6 && account.length > 10)) {
      throw new Error('帳號請限制在6-10個字元')
    }
    if (password.length < 6) {
      throw new Error('密碼最少6個字')
    }
    if (password !== repassword) {
      throw new Error('兩次輸入密碼不一致')
    }
    const reg = /\d{8}/
    if (!reg.test(birthday)) {
      throw new Error('生日格式不正確')
    }
  } catch (e) {
    console.log('register catch')
    console.log(e)
    // return res.redirect('/register')
  }

  var user = new User({
    account: req.fields.account,
    password: req.fields.password,
    repassword: req.fields.repassword,
    birthday: req.fields.birthday,
    email: req.fields.email
  })

  console.log(user)

  // 將 user 寫入資料庫(save)
  user.save(function (err, res) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      console.log('Res: ' + res)
    }
  })
  // .then(function (result) {
  //   console.log('註冊成功')
  //   res.redirect('/')
  // })
  // .catch(function (e) {
  //   console.log('註冊失敗')
  //   return res.redirect('/register')
  // })
})

module.exports = router
