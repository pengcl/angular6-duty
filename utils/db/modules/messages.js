var mongoose = require('mongoose');
var MessagesSchema = require('../schemas/messages'); //拿到导出的数据集模块
var Messages = mongoose.model('Messages', MessagesSchema); // 编译生成Users 模型

module.exports = Messages;
