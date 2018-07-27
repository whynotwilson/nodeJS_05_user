// Mongoose 參考文檔
// https://cnodejs.org/topic/504b4924e2b84515770103dd

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

// schema 是 mongoose 裡會用到的一種數據模式，可以理解為表結構的定義，
// 每個 schema 會對應到 mongoDB 中的一個 collection，它不具備操作資料庫的能力。

// 生成 model
// model 是由 schema 生成的模型，可以對資料庫操作
// module.exports = mongoose.model('User', UserSchema)
exports.User = mongoose.model('User', {
  account: {type: String, unique: true},
  password: {type: String},
  email: {type: String},
  avatar: {type: String}
})
