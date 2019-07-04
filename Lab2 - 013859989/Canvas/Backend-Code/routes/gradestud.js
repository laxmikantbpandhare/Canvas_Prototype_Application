//Signup.js - Signup route module
var express = require('express');
var router = express.Router();
var Model = require('../DataBaseConnection');
var mongooseTypes = require('mongoose').Types;
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});

// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});

//table usage is mandatory else capacity will get intialized for each and every user...will do this afterwards...now focus on nxt part
var courses = [
    {"courseid" : "273", "coursename" : "Environment Distrubuted System","coursedept" : "CMPE",  "coursedesc" : "Environment Distrubuted System","courseroom" : "189","coursecapacity" : 40,"waitlistcapacity" : 40,"coursetemid":"add"},
    {"courseid" : "272", "coursename" : "Physics","coursedept" : "CMPE",  "coursedesc" : "Environment Distrubuted System","courseroom" : "189","coursecapacity" : 40,"waitlistcapacity" : 40,"coursetemid":"add"},
    {"courseid" : "202", "coursename" : "Chemistry","coursedept" : "CMPE",  "coursedesc" : "Environment Distrubuted System","courseroom" : "189","coursecapacity" : 40,"waitlistcapacity" : 40,"coursetemid":"add"}
  ]

//Route to handle Post Request Call
router.post('/',function(req,res){
    if (req.session.user) {
  //  var finalResult =0;
  console.log("Inside Grade submission Post Request");
  console.log("Req Body : ",req.body);


  console.log("message is here");




  Model.grade_details.find({
    'sjsuId': req.body.sjsuId
 }, (err, user) => {
 
 
   if (err) {
       console.log("Unable to fetch user details.", err);
       callback(err, null);
   }
   else {
     console.log(user);
     console.log("User found");
     res.end(JSON.stringify(user))
   }
 
 });
   
    }

  });

  module.exports = router;