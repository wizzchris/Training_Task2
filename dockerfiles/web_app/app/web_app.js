var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');


app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', function(req, res) {
  res.render('home')
});

app.get('/database', function(req, res){
   res.render('database');
});

mongoose.Promise = global.Promise;mongoose.connect("mongodb://database:27017/mydatabase");

var nameSchema = new mongoose.Schema({
 firstName: String,
 lastName: String,
 email: String,
});

var User = mongoose.model("User", nameSchema, "ths");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/database", (req, res) => {
 var myData = new User(req.body);
 myData.save()
 .then(item => {
 res.render('saved');
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

app.get("/getdetails", function (req, res) {
    User.find({}, function(err, users) {
    if (err) throw err;
    res.render('index',{users:users});
})
});

app.get('/find', function(req, res){
   res.render('find');
});

app.post("/find", (req, res) => {
 var myData2 = req.body.sfirstName;
 User.find({firstName: myData2}, function(err, users) {
 if (err) throw err;
 console.log(myData2)
 res.render('search',{users:users});
})
});


app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
