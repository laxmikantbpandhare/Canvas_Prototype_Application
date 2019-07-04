const mongoose = require('mongoose');
var Schema = mongoose.Schema;//issue coming
//const db = require('db');
//var mongo = require('mongodb');
//const MongoClient = require('mongodb').MongoClient

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/HomeAway');

//mongoose.connect('mongodb://localhost:27017/Canvas');
//mongodb+srv://canvas:canvas@cluster0-llr4m.mongodb.net/test?retryWrites=true
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-llr4m.mongodb.net/Canvas?retryWrites=true');

//mongoose.connect('mongodb+srv://cluster0-vpjpa.mongodb.net/Canvas');

//below I tried and it is working
// mongoose.connect('mongodb://127.0.0.1:27017/MusicDB', (err, db) => { 
//     if (err) throw err 
//     db.collection('albums').find({}).toArray((e, albums) => { 
//         db.close() 
//         if (e) throw e
//         console.log(albums)
//     })
// })


//db.collection('albums').find({});

// todo workaround for HMR. It remove old model before added new ones
Object.keys(mongoose.connection.models).forEach(key => {
    delete mongoose.connection.models[key];
  });
  mongoose.Promise = global.Promise;
  
  //mongoose.connect('mongodb+srv://Lucky:Lucky@canvaslucky-llr4m.mongodb.net/test?retryWrites=true');

//   mongoose.connect('mongodb+srv://Lucky:Lucky@canvaslucky-llr4m.mongodb.net/test?retryWrites=true', function(err, db) {
//     if (err) {
//         console.log('Unable to connect to the server. Please start the server. Error:', err);
//     } else {
//         console.log('Connected to Server successfully!');
//     }
// });
 // mongoose.connect('mongodb://localhost:27017/Canvas');

var Userdetails = mongoose.model('Userdetails', {

    'sjsuid' : {
        type: String
    },
    'password' : {
        type: String
    },
    'name' : {
        type: String
    },
    'emailid' : {
        type : String
    },
    'user_flag' : {
        type : String
    }

});


module.exports = {
    Userdetails
};

