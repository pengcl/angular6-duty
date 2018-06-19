var mongoose = require('mongoose');
//申明一个mongoons对象
var OrdersSchema = new mongoose.Schema({
  uid: String,
  status: Number,
  company: {
    name: String,
    address: String,
    license: String,
    legal: {
      passport: {
        A: String,
        B: String
      }
    }
  },
  contact: {
    name: String,
    tel: String,
    mobile: String
  },
  exhibition: {
    name: String,
    company: String,
    no: String,
    manuscript: String,
    contract: String,
    bill: String,
    startAt: {
      type: Date,
      default: Date.now()
    },
    buildAt: {
      type: Date,
      default: Date.now()
    }
  },
  account: {},
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

//每次执行都会调用,时间更新操作
OrdersSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.sendAt = Date.now();
    this.status = 0;
  }
  next();
});

//查询的静态方法
OrdersSchema.statics = {
  findAll: function (cb) { //查询所有数据
    return this.find().sort('meta.updateAt').exec(cb) //回调
  },
  findById: function (id, cb) { //根据id查询单条数据
    return this.findOne({_id: id}).exec(cb)
  },
  findByOwner: function (uid, cb) {
    return this.find({$or: [{to: uid}, {from: uid}]}).sort('meta.publicAt').exec(cb) //回调
  }
};
//暴露出去的方法
module.exports = OrdersSchema;
