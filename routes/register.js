const express = require('express')
const router = express.Router()
// const sha1 = require('sha1')
// const UserModel = require('../models/users')

// 測試用

router.get('/', function (req, res, next) {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/member')
  var db = mongoose.connection

  const User = require('../models/users')
  var user = new User({
    name: 'John',
    birthday: '1888/8/8',
    email: 'www@yahoo.cm'
  })
  user.save(function (err, res) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      console.log('Res: ' + res)
    }
  })

  res.send('register')
})

module.exports = router
