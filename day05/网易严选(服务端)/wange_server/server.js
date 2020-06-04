const express = require('express')
//调用express创建app应用对象
const app = express()
//使用md5库对密码进行加密
const md5 = require('md5')
require('./db')
//要使用数据库要先引入数据库链接模块
//引入数据集合,就可以对这个Users数据进行操作
const Users = require('./models/users')
const Homedata = require('./models/homedata')
const data = require('./datas/index.json')
const indexCateModule = require('./datas/indexCateModule.json')
const indexActivityModule = require('./datas/indexActivityModule.json')
const categoryHotSellModule = require('./datas/categoryHotSellModule.json')
const flashSaleModule = require('./datas/flashSaleModule.json')
const newItemList = require('./datas/newItemList.json')
const cateNavDatas = require('./datas/cateNavDatas.json')
app.use(express.json())
app.post('/login', (req, res) => {
  console.log(req.body)
  const { phoneNum, password } = req.body
  console.log('phoneNum', phoneNum)
  if (!phoneNum) {
    res.json({ code: '10001', msg: '用户名不合法' })
    return
  }
  if (!password) {
    res.json({ code: '10001', msg: '密码不合法' })
    return
  }
  res.json({ code: 200, msg: '登录成功' })
})
app.post('/register', async (req, res) => {
  const { phoneNum, password } = req.body
  if (phoneNum && password) {
    //检查用户/手机号是否已存在
    //使用findOne找到一次就行,条件要写什么?
    //根据传过来的phoneNum去找,可能输的时用户名
    //怎么让他只找一次使用$or
    //返回的是一个Promise
    const result = await Users.findOne(
      //{ $or: [{ phoneNum }, { username }] },
      { phoneNum },
      //只要phoneNum和username,其他不要
      // { phoneNum: 1, username: 1, _id: 0 }
      { phoneNum: 1, _id: 0 }
    )
    //console.log('result', result)
    //将用户存到数据库中
    if (result) {
      try {
        //创建数据的
        // const home1 = await Homedata.create({
        //   'homedata': JSON.stringify(data)
        // }, function (err, doc) {
        //   if (err) {
        //     // console.log('err', err)
        //   } else {
        //     //console.log('doc', doc)
        //   }
        // })
        //获取首页的数据
        const home = await Homedata.findOne({ homedata: data }, { homedata: 1, _id: 0 })
        res.json({ code: 10002, data: home })
        console.log('home', home)
      } catch (e) {
        console.log('e', e)
      }

      //找到了,说明用户名/手机号被注册了
      res.json({ code: 10002, msg: '手机号被注册' })
      return
    }
    //将用户数据存到数据库中,密码存起来一般要进行加密的
    try {
      const user = await Users.create({
        phoneNum,
        password: md5(password)
      })
      //返回响应
      res.json({ code: 1000, data: user })
    } catch (e) {
      console.log('e', e)
      res.json({ code: 1003, msg: '发生未知故障' })
    }
  }
})
//客户端发来请求地址是/home开头的
app.get('/home/*', async (req, res) => {

  console.log('req', req.url)
  const url = req.url
  try {
    const result = await Homedata.findOne({ homedata: data }, { homedata: 1, _id: 0 })
    //如果发送的要获取kingkongModule就给它
    if (url == '/home/kingkongModule') {
      return res.json({ code: 200, data: result.homedata.kingKongModule })
    }
    //如果发送的品牌保证的话
    if (url == '/home/policyDescList') {
      return res.json({ code: 200, data: result.homedata.policyDescList })
    }
    if (url == '/home/focusList') {
      return res.json({ code: 200, data: result.homedata.focusList })
    }
    if (url == '/home/indexCateModule') {
      //console.log('bbb')
      //console.log('aa', req)
      return res.json({ code: 200, data: indexCateModule })
    }
    if (url == '/home/bigPromotionModule') {
      return res.json({ code: 200, data: result.homedata.bigPromotionModule })
    }
    if (url == '/home/indexActivityModule') {
      return res.json({ code: 200, data: indexActivityModule })
    }
    if (url == '/home/categoryHotSellModule') {
      return res.json({ code: 200, data: categoryHotSellModule })
    }
    if (url === '/home/flashSaleModule') {
      console.log('vvv')
      return res.json({ code: 200, data: flashSaleModule })
    }
    if (url === '/home/newItemList') {
      return res.json({
        code: 200, data: newItemList
      })
    }
    if (url === '/home/cateNavDatas') {
      console.log('aa')
      return res.json({
        code: 200, data: cateNavDatas
      })
    }
  } catch (e) {
    res.json({ code: 1003, msg: e })
  }
  return
})
//通过app的listen方法,监听某个端口号9527,localhost
app.listen(9527, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('服务器启动成功')
})