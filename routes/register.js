var User = require('../models/users')
const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const sha1 = require('sha1')

router.get('/', function (req, res, next) {
  res.render('register')
})

router.post('/', function (req, res, next) {
  const account = req.fields.account
  let password = req.fields.password
  const avatar = req.files.avatar.path.split(path.sep).pop()
  const repassword = req.fields.repassword
  const email = req.fields.email

  // 檢查參數
  try {
    const Rule = /\W/ // 帳號和密碼規則，只能英文、底線和數字
    if (account.length < 6 || account.length > 12) {
      throw new Error('帳號請限制在6-12個字元')
    }
    if (Rule.test(account)) {
      throw new Error('帳號格式不正確，只能使用英文、數字和底線')
    }
    if (password.length < 6) {
      throw new Error('密碼最少6個字')
    }
    if (Rule.test(password)) {
      throw new Error('密碼格式不正確，只能使用英文、數字和底線')
    }
    if (password !== repassword) {
      throw new Error('兩次輸入密碼不一致')
    }
    const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
    // ^\w+：@ 之前必須以一個以上的文字&數字開頭，例如 abc
    // ((-\w+)：@ 之前可以出現 1 個以上的文字、數字或「-」的組合，例如 -abc-
    // (\.\w+))：@ 之前可以出現 1 個以上的文字、數字或「.」的組合，例如 .abc.
    // ((-\w+)|(\.\w+))*：以上兩個規則以 or 的關係出現，並且出現 0 次以上 (所以不能 –. 同時出現)
    // @：中間一定要出現一個 @
    // [A-Za-z0-9]+：@ 之後出現 1 個以上的大小寫英文及數字的組合
    // (\.|-)：@ 之後只能出現「.」或是「-」，但這兩個字元不能連續時出現
    // ((\.|-)[A-Za-z0-9]+)*：@ 之後出現 0 個以上的「.」或是「-」配上大小寫英文及數字的組合
    // \.[A-Za-z]+$/：@ 之後出現 1 個以上的「.」配上大小寫英文及數字的組合，結尾需為大小寫英文
    if (!emailRule.test(email)) { // test() 如果有找到符合的字串會回傳 true
      throw new Error('E-mail 格式不正確')
    }
  } catch (e) {
    // 註冊失敗，異步刪除上傳的頭像
    fs.unlink(req.files.avatar.path, () => console.log('刪除已上傳的頭像'))
    console.log(e.message)
    req.flash('error', e.message)

    return res.redirect('/register')
  }

  // 明文密碼加密
  password = sha1(password)

  var user = new User({
    account: req.fields.account,
    password: req.fields.password,
    email: req.fields.email,
    avatar: avatar
  })

  // 將 user 寫入資料庫(save)
  try {
    user.save(function (err, res) {
      if (err) {
        console.log('Error: ' + err)
      } else {
        console.log('Res: ' + res)
      }
    })
    delete user.password // 刪除密碼這種敏感的訊息
    req.session.user = user
    req.flash('success', '註冊成功')
    res.redirect('member')
  } catch (e) {
    console.log('註冊失敗')
    return res.redirect('/')
  }
  // user.save(function (err, res) {
  //   if (err) {
  //     console.log('Error: ' + err)
  //   } else {
  //     console.log('Res: ' + res)
  //   }
  // })
  //   .then(function (result) {
  //     console.log('註冊成功')
  //     res.redirect('/')
  //   })
  //   .catch(function (e) {
  //     console.log('註冊失敗')
  //     return res.redirect('/register')
  //   })
})

module.exports = router
