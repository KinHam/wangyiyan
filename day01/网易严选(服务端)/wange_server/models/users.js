/*
  users集合模块
  引入mongoose,
  创建一个 mongoose.Schema实例对这个集合中的数据进行类型约束
  使用mongoose.model('users',usersSchema)创建一个集合,
  给集合起个存储的名称和约束对象
  把这个集合暴露出去
*/
const mongoose = require('mongoose')
//创建Schema约束对象,Schema:用来对集合中数据进行类型约束
const usersSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   unique: true,
  //   required: true
  // },
  password: {
    type: String,
    require: true
  },
  phoneNum: {
    type: String,
    required: true,
    unique: true
  },
})
//创建集合Model
const Users = mongoose.model('users', usersSchema)
module.exports = Users