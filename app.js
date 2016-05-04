/**
 * Created by Hernan Y.Ke on 2016/5/3.
 */
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("views", "./views");
app.set('view engine', 'jade');
var fs = require('fs');
var accessLog = fs.createWriteStream(__dirname+'/access.log',{flags:'a'})//append mode
app.use(require("morgan")("combined",{stream:accessLog}))
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));
//require('express-debug')(app,{})
app.use(bodyParser.urlencoded({ extended:   true }));
app.use(bodyParser.json());
//app.use(function(err,req,res,next){
//
//})
app.get('/', function (req, res,next) {
    setTimeout(function(){
    try{
        throw new Error('error');
        res.render("home", { title: "Home"});
    }catch(error){
        next(error)
    }},1000);

});

var adminRouter = require("./admin");
app.use("/admin", adminRouter);
var apiRouter = require("./api");
app.use("/api", apiRouter);
app.listen(3000, function () {
    console.log('');
});