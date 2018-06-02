var mongoose = require('mongoose');
//申明一个mongoons对象

var UsersSchema = new mongoose.Schema({
  mobile: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  qq: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  gallery: Array,
  account: {
    total: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    },
    frozen: {
      type: Number,
      default: 0
    },
    banks: Array,
  },
  wx: {
    type: Object,
    default: null
  },
  access_token: {
    type: Object,
    default: null
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    },
    loginAt: {
      type: Date,
      default: Date.now()
    }
  }
});

//每次执行都会调用,时间更新操作
UsersSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.loginAt = this.meta.createAt = this.meta.updateAt = Date.now();

    if (this.wx && this.wx.nickname && !this.name) {
      this.name = this.wx.nickname;
    }
    if (this.wx && this.wx.headimgurl && !this.avatar) {
      this.avatar = this.wx.headimgurl;
    }
  } else {
    this.meta.loginAt = this.meta.updateAt = Date.now();
  }
  next();
});

//查询的静态方法
UsersSchema.statics = {
  findBySomething: function (something, cb) { //根据id查询单条数据
    return this.findOne({$or: [{'username': something}, {'mobile': something}, {'email': something}]}).exec(cb)
  },
  findAll: function (cb) { //查询所有数据
    return this.find().sort('meta.updateAt').exec(cb) //回调
  },
  findById: function (id, cb) { //根据id查询单条数据
    return this.findOne({_id: id}).exec(cb)
  },
  findByMobile: function (mobile, cb) { //根据id查询单条数据
    return this.findOne({'mobile': {$eq: mobile}}).exec(cb);
  },
  findByOpenid: function (openid, cb) { //根据id查询单条数据
    return this.findOne({'wx.openid': {$eq: openid}}).exec(cb);
  }
};
//暴露出去的方法
module.exports = UsersSchema;
