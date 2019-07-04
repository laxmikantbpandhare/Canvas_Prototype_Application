const mongoose = require('mongoose');
var Schema = mongoose.Schema;//issue coming
//const db = require('db');
//var mongo = require('mongodb');
//const MongoClient = require('mongodb').MongoClient

mongoose.Promise = global.Promise;


mongoose.connect('mongodb+srv://canvas:canvas@cluster0-llr4m.mongodb.net/Canvas?retryWrites=true',
{useNewUrlParser: true})
.then(() => console.log("Mongo COnnected"))
.catch(err => console.log(err));