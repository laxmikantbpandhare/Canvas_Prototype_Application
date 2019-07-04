const mongoose = require('mongoose');
var Schema = mongoose.Schema;//issue coming
//const db = require('db');
//var mongo = require('mongodb');
//const MongoClient = require('mongodb').MongoClient

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/HomeAway');
mongoose.connect('mongodb+srv://canvas:canvas@cluster0-llr4m.mongodb.net/Canvas?retryWrites=true');
//mongoose.connect('mongodb://localhost:27017/Canvas');

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

var course_details = mongoose.model('course_details', {

    'courseid' : {
        type: String
    },
    'coursename' : {
        type: String
    },
    'coursedept' : {
        type: String
    },
    'coursedesc' : {
        type : String
    },
    'courseroom' : {
        type : String
    },
    'coursecapacity' : {
        type: String
    },
    'coursewaitlist' : {
        type : String
    },
    'courseterm' : {
        type : String
    }

});


var grade_details = mongoose.model('grade_details', {

    'sjsuId' : {
        type: String
    },
    'grade' : {
        type: String
    }


});


var enroll_students = mongoose.model('enroll_students', {

    'sjsucourseid' : {
        type: String
    },
    'coursedept' : {
        type: String
    },
    'coursename' : {
        type: String
    },
    'sjsuid' : {
        type : String
    },
    'courseid' : {
        type : String
    }

});

var announcement_table = mongoose.model('announcement_table', {

    'courseid' : {
        type: String
    },
    'sjsuid' : {
        type: String
    },
    'announcement' : {
        type: String
    }

});


var quiz_create  = mongoose.model('quiz_create', {

    'question1' : {
        type: String
    },
    'checkbox11' : {
        type: String
    },
    'answer11' : {
        type: String
    },
    'checkbox12' : {
        type: String
    },
    'answer12' : {
        type: String
    },
    'checkbox13' : {
        type: String
    },
    'answer13' : {
        type: String
    },
    'checkbox14' : {
        type: String
    },
    'answer14' : {
        type: String
    },
    'courseid' : {
        type: String
    }

});

var Quiz_Student_data = mongoose.model('Quiz_Student_data', {

    'question1' : {
        type: String
    },
    'answer1' : {
        type: String
    },
    'question2' : {
        type: String
    },
    'answer2' : {
        type: String
    },
    'question3' : {
        type: String
    },
    'answer3' : {
        type: String
    },
    'question4' : {
        type: String
    },
    'answer4' : {
        type: String
    },
    'question5' : {
        type: String
    },
    'answer5' : {
        type: String
    }

});


module.exports = {
    Userdetails,
    course_details,
    enroll_students,
    announcement_table,
    quiz_create,
    Quiz_Student_data,
    grade_details 
};

 