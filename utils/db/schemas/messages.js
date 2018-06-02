var mongoose = require('mongoose');
//申明一个mongoons对象
var MessagesSchema = new mongoose.Schema({
  from: String,
  to: String,
  title: String,
  content: String,
  body: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    sendAt: {
      type: Date,
      default: Date.now()
    },
    readAt: {
      type: Date,
      default: Date.now()
    }
  }
});

//每次执行都会调用,时间更新操作
MessagesSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.sendAt = Date.now();
  }
  next();
});

//查询的静态方法
MessagesSchema.statics = {
  findAll: function (cb) { //查询所有数据
    return this.find().sort('meta.updateAt').exec(cb) //回调
  },
  findById: function (id, cb) { //根据id查询单条数据
    return this.findOne({_id: id}).exec(cb)
  },
  findByUser: function (uid, cb) {
    return this.find({$or: [{to: uid}, {from: uid}]}).sort('meta.publicAt').exec(cb) //回调
  }
};
//暴露出去的方法
module.exports = MessagesSchema;
