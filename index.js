const express = require('express')
const app = express()
const routes = require('./routes')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const pkg = require('./package')
const MongoStore = require('connect-mongo')(session)
const config = require('config-lite')(__dirname)

// 設置模板目錄
app.set('views', path.join(__dirname, 'views'))
// 設置模板引擎
app.set('view engine', 'ejs')

// 設置靜態文件目錄
app.use(express.static(path.join(__dirname, 'public')))

// session 中間件 下面網址有詳細介紹 session/cookie
// http://wiki.jikexueyuan.com/project/node-lessons/cookie-session.html
app.use(session({
  name: config.session.key, // 設置 cookie 中保存 session_id 的字段名稱
  secret: config.session.secret, // 通過設置 secret 來計算 hash 並放在 cookie 中，使產生的 signedCookie 防竄改
  resave: true, // 強制更新 session
  cookie: {
    maxAge: config.session.maxAge // 過期時間，過期後 cookie 中的 session_id 自動刪除
  },
  store: new MongoStore({
    url: config.mongodb // 儲存到mongoDB
  })
}))

// flash 中間件，顯示通知
app.use(flash())

// 處理表單及文件上傳的中間件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'), // 上傳文件(頭像)目錄
  keepExtensions: true // 保留後綴(副檔名) .img .png 等等
}))

// 設定模板全局常量
// app.locals(key, value) 是全局的
// res.locals() 是針對當前請求的
app.locals.member = {
  title: pkg.name,
  // title: 'test title',
  description: pkg.description // ?
}

// 設定模板必須的三個變量
app.use(function (req, res, next) {
  // res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

routes(app)

app.listen(3000)
console.log('Node server is running on port 3000......')
console.log(app.locals.user)
