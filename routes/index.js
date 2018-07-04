module.exports = function (app) {
  app.get('/', function (req, res, next) {
    res.send('root')
  })

  app.use('/login', require('./login'))
  app.use('/register', require('./register'))

  // 中間件測試
  // app.use(function (req, res, next) {
  //   console.log('Time : ' + Date.now())
  //   next()
  // })
}
