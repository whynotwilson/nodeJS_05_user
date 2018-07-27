const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const sha1 = require('sha1')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const UserModel = require('../models/users')

router.get('/', checkNotLogin, function (req, res, next) {
  res.render('register', {user: false})
})

router.post('/', checkNotLogin, function (req, res, next) {
  const account = req.fields.account
  let password = req.fields.password
  const avatar = req.files.avatar.path.split(path.sep).pop()
  const repassword = req.fields.repassword
  const email = req.fields.email

  // 檢查參數
  try {
    const Rule = /\W/ // 帳號和密碼規則，只能英文、底線和數字
    if (account.length < 6 || account.length > 12) {
      throw new Error('註冊失敗，帳號請限制在6-12個字元')
    }
    if (Rule.test(account)) {
      throw new Error('註冊失敗，帳號格式不正確，只能使用英文、數字和底線')
    }
    if (password.length < 6) {
      throw new Error('註冊失敗，密碼最少6個字')
    }
    if (Rule.test(password)) {
      throw new Error('註冊失敗，密碼格式不正確，只能使用英文、數字和底線')
    }
    if (password !== repassword) {
      throw new Error('註冊失敗，兩次輸入密碼不一致')
    }
    if (avatar.indexOf('.') === -1) {
      throw new Error('註冊失敗，請選取頭像')
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
    req.flash('error', e.message)
    // if (e.message.match('duplicate key')) {
    //   req.flash('error', '此帳號已被使用')
    //   return res.redirect('/register')
    // }

    return res.redirect('/register')
  }

  // 明文密碼加密
  password = sha1(password)

  // 要用 let 因為這邊每個 function 的
  let user = ({
    account: account,
    password: password,
    email: email,
    avatar: avatar
  })

  // promise 詳細說明
  // https://eyesofkids.gitbooks.io/javascript-start-es6-promise/content/contents/promise_a_plus.html
  // 淺談 promise(then、catch、resolve、reject、race、all、done、finally)
  // https://blog.csdn.net/momDIY/article/details/77856099
  UserModel.create(user)
    .then(function (result) {
      console.log('result: ') // 測試
      console.log(result) /*
      // result:
      { _id: 5b5adc43eb1c2c1e84af49d6,
        account: '999999',
        password: '1f5523a8f535289b3401b29958d01b2966ed61d2',
        email: '999999@hoo.com',
        avatar: 'upload_faeb062343fd700de3977a50e9a05a7b.jpg',
        __v: 0
      }
      */

      // 刪除密碼這種敏感的訊息，將用戶訊息存入 session
      delete user.password
      req.session.user = user
      // 寫入 flash
      req.flash('success', '註冊成功')

      // 跳轉到會員頁
      res.redirect('member')
    })
    .catch(function (e) {
      console.log('註冊失敗')
      console.log(e.message)
      // 註冊失敗，異步刪除上傳的頭像
      fs.unlink(req.files.avatar.path)

      // 帳號重複，重新跳轉回註冊頁
      if (e.message.indexOf('duplicate key')) {
        req.flash('error', '註冊失敗，帳號已被使用')
        return res.redirect('register')
      }
      next(e)
    })
})

module.exports = router
