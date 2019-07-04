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
var pool = require('./connectionPool.js');

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
  var filename;

var logincheck = [
  {"finalstatus" : false, "facultyfnd" : false, "pwdvalidity" : false}
]

//Route to handle Post Request Call
app.post('/login',function(req,res){


  logincheck.filter(function(user){
    user.finalstatus = false;
    user.facultyfnd =  false;
    user.pwdvalidity = false
  })
  console.log("Inside Login Post Request");
  console.log("Req Body : ",req.body);

console.log(req.body.sjsuId);


//Mysql database connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "GHE@ta91",
  database : "Luckycmpe273",
  useColumnNames: true
});

 connection.connect();
 console.log("val1sjsuid", req.body.sjsuId);
 console.log("val1pwd", req.body.password);
 var ecrypted = encryption(req.body.password);
 console.log("ecrypted",ecrypted);
 console.log(req.session.user);

// if(req.session.user)
// {
//     res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//     console.log("check here", req.session.user);
//     res.json({message: "Logged in", status: 200});
//     res.redirect('/');
// }
// else{

   // this process will avoid SQL injection attack
let sql = "SELECT user_flag,password FROM user_login_details WHERE sjsuid = ?";
connection.query(sql,req.body.sjsuId, function (error, results, fields) {
  //if (!error) throw error;

    if ( results.length > 0 )
    {
        console.log('res: ', results);
        logincheck.filter(function(user){
          user.finalstatus = true;
        })
          console.log(logincheck)

           console.log("results[0].user_flag",results[0].user_flag);
           if(results[0].user_flag=='Y'){
           logincheck.filter(function(user){
             user.facultyfnd = true;
             user.finalstatus = true;
        })
      }

      if(results[0].password==ecrypted){
        console.log("Valid Pwd");
        req.session.user = true;
        console.log("req.session.user = result[0];", req.session.user);
        logincheck.filter(function(user){
          user.pwdvalidity = true;
        // console.log("check kar be set zala ka te");

       })
        console.log(JSON.stringify(logincheck));
        res.end(JSON.stringify(logincheck));
      }
      else{
        console.log("Invalid Pwd");
        console.log(JSON.stringify(logincheck));
        res.end(JSON.stringify(logincheck));
      }

    }
    else
    {
        console.log("Row not Found");
        console.log(JSON.stringify(logincheck));
        res.end(JSON.stringify(logincheck));
    }    
});
connection.end();
//}
});

//Route to handle Post Request Call
app.post('/signup',function(req,res){

    console.log("Inside Login signup post Request");
    console.log("Req Body : ",req.body);

  //encryption is working verified thru this process. use this during insert and then try for login as well
    var ecrypted = encryption(req.body.password);
    console.log("ecrypted",ecrypted);

    //Mysql database connection
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "GHE@ta91",
      database : "Luckycmpe273"
    });

    connection.connect();
   if (req.body.isFaculty){
      console.log("if madhe");
      var userflag = 'Y';
   }
    else{
      console.log("else madhe");
       var userflag = 'N';
    }
    //this will avoid SQL injection attack
   let sql = "INSERT INTO user_login_details (sjsuid, password, name, emailid, user_flag) VALUES  ? ";
   let inser_vals = [
        [req.body.sjsuId ,ecrypted, req.body.name, req.body.email, userflag]
   ];

     connection.query(sql, [inser_vals], function (error, results, fields) {
  
   if (!error) throw error;
   console.log(error);
      console.log("results"+results);
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
       res.end(JSON.stringify(finalStatus));
   });
    
   connection.end();

});


//Route to handle get Request Call
app.get('/Dashboard/enroll',function(req,res){
  if (req.session.user) {
  var finalResult =0;
console.log("Inside Enroll Login get Request");
console.log("Req Body : ",req.body);

console.log(req.body.sjsuId);

  res.end(JSON.stringify(courses));
  }
});

//Route to handle Post Request Call
app.post('/Dashboard/enroll/enrollstudent',function(req,res){
  var finalResult =0;
  if (req.session.user) {
console.log("Inside enroll studnet Post Request");
var concat = req.body.sjsuId + req.body.courseid;
console.log(concat);

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
    
         //this will avoid SQL injection attack
         let sql = "INSERT INTO enroll_student (sjsucourseid, coursedept, coursename,sjsuid,courseid) VALUES  ? ";
         let inser_vals = [
              [concat, req.body.coursedept, req.body.coursename,req.body.sjsuId,req.body.courseid]
          ];
          console.log(inser_vals);
         connection.query(sql, [inser_vals], function (error, results, fields) {
      
          //if (!error) throw error;
             console.log(error);   
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
                 res.end(JSON.stringify(finalStatus));
             });
    
     connection.end();
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

//Route to handle Post Request Call
app.post('/Dashboard/coursecreation',function(req,res){
  if (req.session.user) {
  var finalResult =0;
console.log("Inside coursecreation Post Request");
console.log("Req Body : ",req.body);
//console.log("courses : ",courses);
// if(!req.session.user){
//   res.redirect('/');
//   console.log("check redirect in node");
//   }
//   else{

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

     //this will avoid SQL injection attack
     let sql = "INSERT INTO course_details (courseid, coursename, coursedept, coursedesc, courseroom,coursecapacity,waitlistcapacity,coursetermid) VALUES  ? ";
     let inser_vals = [
          [req.body.courseid , req.body.coursename, req.body.coursedept, req.body.coursedesc,req.body.courseroom,req.body.coursecapacity,req.body.coursewaitlist,req.body.courseterm]
     ];

     connection.query(sql, [inser_vals], function (error, results, fields) {
  
      //if (!error) throw error;
            
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
             res.end(JSON.stringify(finalStatus));
         });

  
 connection.end();


// console.log(courses);
res.end(JSON.stringify(courses));
 }
});

//Route to handle Post Request Call
app.post('/Dashboard/enroll/details',function(req,res){
  if (req.session.user) {
  var finalResult =0;
console.log("Inside details Login Post Request");
console.log("Req Body : ",req.body);
console.log("courses : ",courses);


console.log(req.body.sjsuId);

res.writeHead(200,{
  'Content-Type' : 'application/json'
});
console.log("Courses : ",JSON.stringify(courses));
//res.end("Successful Login");
 res.end(JSON.stringify(courses));
}
});

//added encryption and decryption here
var crypto = require('crypto'),
    algo = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encryption(input){
    var cipher = crypto.createCipher(algo,password);
    var cryptdata = cipher.update(input,'utf8','hex')
    cryptdata += cipher.final('hex');
    return cryptdata;
}

function decryption(input){
    var decipher = crypto.createDecipher(algo,password)
    var decdata = decipher.update(input,'hex','utf8')
    decdata += decipher.final('utf8');
    return decdata; 
}

//Route to handle Post Request Call
app.post('/Dashboard/accountprofile',function(req,res){
  if (req.session.user) {
  var finalResult =0;
console.log("Inside account profile Post Request");
console.log("Req Body : ",req.body);

//Mysql database connection
var connection = mysql.createConnection({
host: "localhost",
user: "root",
password: "GHE@ta91",
database : "Luckycmpe273",
// debug: true
});
connection.connect();
console.log("val1",+req.body.sjsuid);
// this process will avoid SQL injection attack
let sql = "SELECT sjsuid,name,emailid FROM user_login_details WHERE sjsuid = ?";
connection.query(sql,req.body.sjsuId, function (error, results, fields) {
//if (!error) throw error;

 console.log("results"+results);
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

  console.log(JSON.stringify(results));
  res.end(JSON.stringify(results));
});
connection.end();
  }
});

//Route to handle Post Request Call
app.post('/DashboardFaculty/announcement',function(req,res){
  if (req.session.user) {
  var finalResult =0;
console.log("Inside Prof Announcement Post Request");
console.log("Req Body : ",req.body);
//console.log("courses : ",courses);
// if(!req.session.user){
//   res.redirect('/');
//   console.log("check redirect in node");
//   }
//   else{

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
     let sql = "INSERT INTO announcement_table (courseid, sjsuid, announcement) VALUES  ? ";
     let inser_vals = [
          [req.body.courseid , req.body.sjsuId, req.body.announcement]
      ];

      console.log(req.body.courseid );
      console.log(req.body.sjsuId );
      console.log(req.body.announcement );
      

     connection.query(sql, [inser_vals], function (error, results, fields) {
  
      //if (!error) throw error;
            
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
             res.end(JSON.stringify(finalStatus));
         });

  
 connection.end();

res.end(JSON.stringify(courses));
        }
});


//Route to handle Post Request Call
app.post('/Dashboard/announcement',function(req,res){
  if (req.session.user) {
  var finalResult =1;
console.log("Inside Prof Announcement Post Request");
console.log("Req Body : ",req.body);
//console.log("courses : ",courses);
// if(!req.session.user){
//   res.redirect('/');
//   console.log("check redirect in node");
//   }
//   else{

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
            res.end(JSON.stringify(results));
        });

  
 connection.end();
      }
//res.end(JSON.stringify(finalResult));
});


//multer

//Route to handle Post Request Call
app.post('/Dashboard/quizcreation',function(req,res){
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

      let sql = "SELECT question1 FROM quiz_create WHERE courseid = (SELECT courseid FROM course_details)";
     connection.query(sql, function (error, results, fields) {
  
      //if (!error) throw error;
      console.log(error);
      coursedata = JSON.stringify(results[0].courseid);
      console.log("coursedatata", coursedata)
      console.log("han ni hay nakhara ", results[0].courseid);
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
app.post('/Dashboardfaculty/quizcreation',function(req,res){
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
     let sql = "INSERT INTO quiz_create (question1, checkbox11, answer11, checkbox12, answer12  , checkbox13, answer13, checkbox14, answer14, courseid) VALUES  ? ";
     let inser_vals = [
          [req.body.question1 , userflag11, req.body.answer11, userflag12, req.body.answer12, userflag13,req.body.answer13,userflag14,req.body.answer14,req.body.courseid]
     ];

     connection.query(sql, [inser_vals], function (error, results, fields) {
  
      //if (!error) throw error;
           console.log(error)
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
             res.end(JSON.stringify(finalStatus));
         });

  
 connection.end();


// console.log(courses);
res.end(JSON.stringify(courses));
 }
});


//Route to handle Post Request Call
app.post('/Dashboard/quizsubmit',function(req,res){
  if (req.session.user) {
  var finalResult =0;
console.log("Inside quizcreation Post Request");
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
     let sql = "INSERT INTO Quiz_Student_data (question1, answer1, question2, answer2, question3  , answer3, question4, answer4, question5, answer5) VALUES  ? ";
     let inser_vals = [
          [req.body.question1 , req.body.answer1, req.body.question2, req.body.answer2, req.body.question3, req.body.answer3,req.body.question4,req.body.answer4,req.body.question5,req.body.answer5]
     ];

     connection.query(sql, [inser_vals], function (error, results, fields) {
  
      //if (!error) throw error;
           console.log(error)
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
             res.end(JSON.stringify(finalStatus));
         });

  
 connection.end();
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

//start your server on posrt 3001
app.listen(3001);
console.log("Server Listening on port 3000");