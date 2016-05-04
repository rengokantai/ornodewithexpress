/**
 * Created by Hernan Y.Ke on 2016/5/4.
 */
var fs = require('fs');
var accessLog = fs.createWriteStream(__dirname+'/access.log',{flags:'a'})//append mode
module.exports = require("morgan")("combined",{stream:accessLog});