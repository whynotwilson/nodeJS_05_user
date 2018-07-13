module.exports = function (app) {
  app.get('/', function (req, res, next) {
    // res.send('root')

    // req.flash('success', 'flash 測試')
    // res.render('root')

    // req.flash('error', '錯誤')
    req.flash('success', '成功 test')
    res.redirect('/register')
    // res.render('root', { success: 'flash測試' })
    // res.send('root')
  })

  app.get('/a', function (req, res, next) {
    req.flash('success', 'a')
    res.redirect('/b')
  })

  app.get('/b', function (req, res, next) {
    req.flash('error', 'b')
    res.render('register')
  })

  app.use('/login', require('./login'))
  app.use('/register', require('./register'))

  // app.use('/b', require('./b'))

  // 中間件測試
  // app.use(function (req, res, next) {
  //   console.log('Time : ' + Date.now())
  //   next()
  // })
}
