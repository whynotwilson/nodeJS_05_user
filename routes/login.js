const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.send('login')
})

router.post('/', function (req, res, next) {
  const data = {
    hi: 'all'
  }
  res.json(data)
})

module.exports = router
