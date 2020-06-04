const mongoose = require('mongoose')

//const home = require('../datas/index.json')
const homedataSchema = new mongoose.Schema
  ({
    homedata: {
      type: Object,
      require: true
    }
  })
const homedata = mongoose.model('homedatas', homedataSchema)
module.exports = homedata