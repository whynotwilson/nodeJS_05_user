module.exports = function (app) {
  app.get('/', function (req, res) {
    // 測試
    var data = {
      hello: 'guest'
    }
    res.json(data)
    // res.send('root')
  })

  app.use('/login', require('./login'))
}
