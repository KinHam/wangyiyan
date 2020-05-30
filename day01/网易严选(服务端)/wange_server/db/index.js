/*
  用来链接mongoDB数据库模块
*/
const mongoose = require('mongoose')
//mongodb://localhost:27017 mongodb服务地址
mongoose.connect('mongodb://localhost:27017/wange', {
  //解决运行时三个警告
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
//判断链接数据库有无成功
//once绑定一次性事件
mongoose.connection.once('open', (err) => {
  if (err) {
    console.log('链接数据库失败', err)
    return
  }
  console.log('链接数据库成功')
})

