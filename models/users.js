const mongoose = require('../lib/mongo')
var Schema = mongoose.Schema

// 生成Schema
// schema 是 mongoose 裡會用到的一種數據模式，可以理解為表結構的定義，
// 每個 schema 會對應到 mongoDB 中的一個 collection，它不具備操作資料庫的能力。
var UserSchema = new Schema({
  name: {type: String},
  birthday: {type: String},
  email: {type: String}
})

// 生成 model
// model 是由 schema 生成的模型，可以對資料庫操作
module.exports = mongoose.model('User', UserSchema)
