const mongoose = require('mongoose')
const config = require('config-lite')(__dirname)

try {
  mongoose.connect(config.mongodb)
} catch (err) {
  console.log(err)
}

mongoose.connection.once('open', function () {
  console.log('資料庫連線成功')
}).on('error', function (err) {
  throw err
})

module.exports = mongoose
