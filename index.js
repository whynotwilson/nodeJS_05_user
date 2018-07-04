const express = require('express')
const app = express()
const routes = require('./routes')
const path = require('path')

// 設置模板目錄
app.set('views', path.join(__dirname, 'views'))
// 設置模板引擎
app.set('view engine', 'ejs')

// 處理表單及文件上傳的中間件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'), // 上傳文件(頭像)目錄
  keepExtensions: true // 保留後綴
}))

routes(app)

app.listen(3000)
console.log('Node server is running on port 3000......')
