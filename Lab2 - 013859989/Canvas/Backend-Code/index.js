//import the require dependencies
var express = require('express');
var app = express();//.router();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var cors = require('cors');
const fs = require('fs');
var glob = require('glob');

app.set('view engine', 'ejs');
var mysql = require('mysql'); 
const multer = require('multer');
const path = require('path');
//var pool = require('./connectionpool.js');
var Model = require('./DataBaseConnection');
var cors = require('cors');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});




var login = require('./routes/login');
var signup = require('./routes/signup');
var accountprofile = require('./routes/accountprofile');
var enroll = require('./routes/enroll');
var enrollstudent = require('./routes/enrollstudent');
var coursecreation = require('./routes/coursecreation');
var enrolldetails = require('./routes/enrolldetails');
var enrolldetails1 = require('./routes/enrolldetails1');
var enrolldetails2 = require('./routes/enrolldetails2');
var subjectdetails = require('./routes/subjectdetails');
var grade = require('./routes/grade');
var gradestuds = require('./routes/gradestud');





//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

//For Connection Pooling

var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'GHE@ta91',
  database: 'Luckycmpe273'
});

app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
//table usage is mandatory else capacity will get intialized for each and every user...will do this afterwards...now focus on nxt part
  var courses = [
    {"courseid" : "273", "coursename" : "Environment Distrubuted System","coursedept" : "CMPE",  "coursedesc" : "Environment Distrubuted System","courseroom" : "189","coursecapacity" : 40,"waitlistcapacity" : 40,"coursetemid":"add"},
    {"courseid" : "272", "coursename" : "Physics","coursedept" : "CMPE",  "coursedesc" : "Environment Distrubuted System","courseroom" : "189","coursecapacity" : 40,"waitlistcapacity" : 40,"coursetemid":"add"},
    {"courseid" : "202", "coursename" : "Chemistry","coursedept" : "CMPE",  "coursedesc" : "Environment Distrubuted System","courseroom" : "189","coursecapacity" : 40,"waitlistcapacity" : 40,"coursetemid":"add"}
  ]

  var  coursedata = 0;
  //var filename;

var logincheck = [
  {"finalstatus" : false, "facultyfnd" : false, "pwdvalidity" : false}
]

//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);

app.use('/login', login);
app.use('/signup', signup);
app.use('/Dashboard/accountprofile', accountprofile);
app.use('/Dashboard/enroll', enroll);
app.use('/Dashboard/enroll/enrollstudent', enrollstudent);
app.use('/Dashboard/coursecreation', coursecreation);
app.use('/Dashboard/enroll/details', enrolldetails);
app.use('/Dashboard/enroll/details1', enrolldetails1);
app.use('/Dashboard/enroll/details2', enrolldetails2);
app.use('/Dashboard/subject/details', subjectdetails);
app.use('/DashboardFaculty/grade', grade);
app.use('/Dashboard/gradestud', gradestuds);
//app.use('/DashboardFaculty/announcement', facultyannouncement);




//Route to handle Post Request Call
app.post('/DashboardFaculty/announcement',requireAuth,function(req,res){
  if (req.session.user) {

console.log("Inside Prof Announcement Post Request");
console.log("Req Body : ",req.body);

var user = new Model.announcement_table({
   courseid: req.body.courseid ,
   sjsuid: req.body.sjsuId,
   announcement: req.body.announcement
});

user.save().then((doc) => {
    
  console.log("Announcement saved successfully.", doc);
//       callback(null, doc);

}, (err) => {
  console.log("Unable to save Announcement details.", err);
//         callback(err, null);
});

res.end(JSON.stringify(courses));
}
});

//Route to handle Post Request Call
app.post('/Dashboard/announcement',requireAuth,function(req,res){
  if (req.session.user) {
  var finalResult =1;
console.log("Inside Prof Announcement Post Request");
console.log("Req Body : ",req.body);

    //Mysql database connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "GHE@ta91",
  database : "Luckycmpe273",
  useColumnNames: true
});

  connection.connect();

     //this will avoid SQL injection attack
     let sql = "SELECT * FROM announcement_table";

      console.log(req.body.courseid );
      console.log(req.body.sjsuId );
      console.log(req.body.announcement );
      

    connection.query(sql, function (error, results, fields) {
  
    //  if (!error) throw error;
            
            console.log(results);
             if ( results.length > 0 )
             {
                 console.log(results);
                 var finalStatus = true;
                 console.log("Row found");
             }
             else
             {
                 var finalStatus = false;
                 console.log("Row not Found");
             }
             console.log(results);  
             res.end(JSON.stringify(results));
        });
        // res.end(JSON.stringify(results));
 connection.end();
//  res.end(JSON.stringify(results));

  
// Model.announcement_tables.find({
//   //'sjsuid': req.body.sjsuId
// }, (err, user) => {


//   if (err) {
//       console.log("Unable to fetch user details.", err);
//       callback(err, null);
//   }
//   else {
//     console.log(user);

//       }
// });

      }
//res.end(JSON.stringify(results));
});


//multer

//Route to handle Post Request Call
app.post('/Dashboard/quizcreation',requireAuth,function(req,res){
  if (req.session.user) {
  var finalResult =0;

if(req.session.user){
console.log("Inside quiz student creation Post Request");
console.log("Req Body : ",req.body);

    //Mysql database connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "GHE@ta91",
  database : "Luckycmpe273",
  useColumnNames: true
 // debug: true
});

  connection.connect();
    console.log("coming here");
      let sql = "SELECT question1 FROM quiz_create WHERE courseid = (SELECT courseid FROM course_details)";
     connection.query(sql, function (error, results, fields) {
  
      //if (!error) throw error;
      console.log(error);
      coursedata = JSON.stringify(results[0].courseid);
      console.log("coursedatata", coursedata)
           console.log(error)
             if ( results.length > 0 )
             {
                 console.log(results);
                 console.log("Row found");
             }
             else
             {
                 var finalStatus = false;
                 console.log("Row not Found");
             }
             res.end(JSON.stringify(results));
         });
         connection.end();
        }
      }
});


//Route to handle Post Request Call
app.post('/Dashboardfaculty/quizcreation',requireAuth,function(req,res){
  if (req.session.user) {
  var finalResult =0;
console.log("Inside quizcreation Post Request");
console.log("Req Body : ",req.body);

  if (req.body.checkbox11){
    console.log("if madhe");
    var userflag11 = 'Y';
 }
  else{
    console.log("else madhe");
     var userflag11 = 'N';
  }

  if (req.body.checkbox12){
    console.log("if madhe");
    var userflag12 = 'Y';
 }
  else{
    console.log("else madhe");
     var userflag12 = 'N';
  }

  if (req.body.checkbox13){
    console.log("if madhe");
    var userflag13 = 'Y';
 }
  else{
    console.log("else madhe");
     var userflag13 = 'N';
  }

  if (req.body.checkbox14){
    console.log("if madhe");
    var userflag14 = 'Y';
 }
  else{
    console.log("else madhe");
     var userflag14 = 'N';
  }

var user = new Model.quiz_create({
  question1: req.body.question1 ,
  checkbox11: userflag11,
  answer11: req.body.answer11,
  checkbox12: userflag12,
  answer12: req.body.answer12,
  checkbox13: userflag13,
  answer13: req.body.answer13,
  checkbox14: userflag14,
  answer14: req.body.answer14,
  courseid : req.body.courseid
});

user.save().then((doc) => {
   
 console.log("Quiz saved successfully.", doc);
//       callback(null, doc);

}, (err) => {
 console.log("Unable to save Quiz details.", err);
//         callback(err, null);
});

res.end(JSON.stringify(courses));
 }
});


//Route to handle Post Request Call
app.post('/Dashboard/quizsubmit',requireAuth,function(req,res){
  if (req.session.user) {
  var finalResult =0;
console.log("Inside quizcreation submission Post Request");
console.log("Req Body : ",req.body);

var user = new Model.Quiz_Student_data({
  question1: req.body.question1,
  answer1: req.body.answer1,
  question2: req.body.question2,
  answer2: req.body.answer2,
  question3: req.body.question3,
  answer3: req.body.answer3,
  question4: req.body.question4,
  answer4: req.body.answer4,
  question5: req.body.question5,
  answer5 : req.body.answer5
});

user.save().then((doc) => {
   
 console.log("Quiz Submitted successfully.", doc);
 var finalStatus = true;
 res.end(JSON.stringify(finalStatus));
//       callback(null, doc);

}, (err) => {
 console.log("Unable to save Quiz details.", err);
 var finalStatus = false;
 res.end(JSON.stringify(finalStatus));
//         callback(err, null);
});
}
});


//Storing documents/Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads');
  }
  , filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/uploadprofile', upload.array('photos', 5), (req, res) => {
  if (req.session.user) {
  console.log("working on profiles");
  console.log('req.body', req.body);
  res.end();
  }
});



//Storing documents/Images
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads1');
  }
  , filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
});

const upload1 = multer({ storage1 });

app.post('/uploaddata', upload1.array('photos', 5), (req, res) => {
  if (req.session.user) {
  console.log("working on files");
  console.log('req.body', req.body);
  res.end();
  }
});


//download-file

//app.post('/downloadfile/:file(*)', (req, res) => {
  app.post('/downloadprofile', (req, res) => {
    if (req.session.user) {
  console.log('Inside DOwnload File');
  //var file = req.params.file;
  var filelocation = path.join(__dirname + '/uploads'+'/abcd.jpg');
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {
      'Content--type': 'image/jpg'
  });
  res.end(base64img);
}
});

//app.post('/downloadfile/:file(*)', (req, res) => {
  app.post('/downloadprofile1', (req, res) => {
    if (req.session.user) {
  console.log('Inside DOwnload File');
  //var file = req.params.file;
  var filelocation = path.join(__dirname + '/uploads'+'/Pandhare_Lab2_report.pdf');
  var img = fs.createReadStream(filelocation);
 // var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {
      'Content--type': 'image/jpg'
  });
  img.pipe(res);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {
    'Content--type': 'file/pdf'
});
  res.end(img);
}
});



//Route to handle Post Request Call
app.post('/Dashboard/updateprofile',requireAuth,function(req,res){
  if (req.session.user) {
console.log("Inside update profile Post Request");
console.log("Req Body : ",req.body);

Model.Userdetails.findOne({
  'sjsuid': req.body.sjsuId
}, (err, user) => {

  if (err) {
      console.log("Unable to fetch user details.", err);
   //   callback(err, null);
  }
  else {
      console.log('Userdetails', user);

      user.name = req.body.name;
      user.emailid = req.body.emailid;

      user.save().then((doc) => {

          console.log("User details Updated successfully.", doc);
          var finalStatus = true;
          res.end(JSON.stringify(finalStatus));
        //  callback(null, doc);

      }, (err) => {
          console.log("Unable to Update user details.", err);
          var finalStatus = true;
          res.end(JSON.stringify(finalStatus));
          //callback(err, null);
      });
  }
});

 }
});

app.post('/Dashboard/logout',function(req,res){
  if (req.session.user) {
    var session=req.session;
    console.log("In logout ", req.session.user)
    session.user = null;
    session.destroy();
    res.json({
        status:'200',
        message : "Logged Out."
    });
    res.end();
  }
});



//start your server on posrt 3001
app.listen(3001);
console.log("Server Listening on port 3000");