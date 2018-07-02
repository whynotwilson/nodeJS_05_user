const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

exports.User = mongolass.model('User', {
  name: {type: 'string', require: true},
  birthday: {type: 'string', require: true},
  email: {typq: 'string', require: true}
})
exports.User.index({name: 1}, {unique: true}).exec()
