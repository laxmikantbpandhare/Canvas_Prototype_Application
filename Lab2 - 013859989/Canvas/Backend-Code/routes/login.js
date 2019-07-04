//Signup.js - Signup route module
var express = require('express');
var router = express.Router();

//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
const secret = "secret";


//Kafka
var kafka = require('../kafka/client');

var logincheck = [
    {"finalstatus" : false, "facultyfnd" : false, "pwdvalidity" : false}
  ]

//Route to handle Post Request Call
router.post('/',function(req,res){


  //   logincheck.filter(function(user){
  //     user.finalstatus = false;
  //     user.facultyfnd =  false;
  //     user.pwdvalidity = false
  //   })
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);

  //   Model.Userdetails.findOne({
  //     'sjsuid': req.body.sjsuId
  // }, (err, user) => {

  //     if(user.user_flag=="Y")
  //     {
  //       logincheck.filter(function(user){
  //         user.facultyfnd = true;

  //      })
  //     }
  //     else{
  //       logincheck.filter(function(user){
  //         user.facultyfnd = false;

  //      })
  //     }
  //     if (err) {
  //         console.log("Unable to fetch user details.", err);
  //         callback(err, null);
  //     }
  //     else {
  //       console.log(user);
  //       //console.log("User found");
  //       if(user){
  //         console.log("User details ", user);
  //         if (!bcrypt.compareSync(req.body.password, user.password)) {                
  //             console.log('Invalid Credentials!');
  //             res.end(JSON.stringify(logincheck));
  //             //callback(null, null);                
  //         }
  //         else {
  //           console.log('valid Credentials!');
  //           logincheck.filter(function(user){
  //             user.pwdvalidity = true;
  //             user.finalstatus = true;
  //          })
  //          res.end(JSON.stringify(logincheck));
  //            // callback(null, user);
  //         }
  //     }
  //     }

  //   });


  kafka.make_request('login', req.body, function(err, result){
    console.log('In results Signup');
    console.log('Results: ', result);
    
    if(result.user_flag=="Y")
    {
      logincheck.filter(function(user){
        user.facultyfnd = true;

     })
    }
    else{
      logincheck.filter(function(user){
        user.facultyfnd = false;

     })
    }

    if(result){ 
        logincheck.filter(function(user){
            user.pwdvalidity = true;
            user.finalstatus = true;
         })           
        console.log("Logged in successfully.");
        console.log(result);
        req.session.user = true;
            // Create token if the password matched and no error was thrown
            var token = jwt.sign({sjsuid:result.sjsuid}, secret, {
              expiresIn: 10080 // in seconds
          });
          console.log(token);


          var Result = {
            logincheck : logincheck,
            Token : token
        }
          
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });
        console.log(JSON.stringify(Result));
        res.end(JSON.stringify(Result));
       // res.end('logging in successful!');
    }
    else if(result == null){
        console.log("Login issue.");
        res.writeHead(210, {
            'Content-type': 'text/plain'
        });
        res.end('Dupplicate user!');
    }

    if(err){
        console.log("Unable to fetch user details. Error in Signup.", err);
        res.writeHead(400, {
            'Content-type': 'text/plain'
        });
        res.end('Error in fetching user details!');            
    }
});


});

module.exports = router;