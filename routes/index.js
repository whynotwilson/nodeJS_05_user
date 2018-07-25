module.exports = function (app) {
  app.get('/', function (req, res, next) {
    // res.redirect('member')
    res.render('root')
  })

  // 測試 connect-flash 顯示通知功能
  // app.get('/a', function (req, res, next) {
  //   req.flash('success', 'a') // 測試 flash 功能
  //   // console.log(req.flash('success')) // [ 'a' ]
  //   res.redirect('/b')
  // })
  // app.get('/b', function (req, res, next) {
  //   // req.flash('success', 'b')
  //   // console.log(req.flash('success')) // [] 空的，因為已經被刪除了
  //   req.flash('success', 'b')
  //   // console.log(req.flash('success')) // [ 'b' ]
  //   res.render('b')
  // })
  app.use('/login', require('./login'))
  app.use('/register', require('./register'))
  app.use('/member', require('./member'))
  app.use('/logout', require('./logout'))

  // 中間件測試
  // app.use(function (req, res, next) {
  //   console.log('Time : ' + Date.now())
  //   next()
  // })
}
