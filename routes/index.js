module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send('root')
  })

  app.use('/login', require('./login'))
}
