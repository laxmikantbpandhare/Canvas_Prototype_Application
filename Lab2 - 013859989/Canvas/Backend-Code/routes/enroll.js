//Signup.js - Signup route module
var express = require('express');
var router = express.Router();
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var Model = require('../DataBaseConnection');


//table usage is mandatory else capacity will get intialized for each and every user...will do this afterwards...now focus on nxt part
var courses = [
  {"courseid" : "273", "coursename" : "Environment Distrubuted System","coursedept" : "CMPE",  "coursedesc" : "Environment Distrubuted System","courseroom" : "189","coursecapacity" : 40,"waitlistcapacity" : 40,"coursetemid":"add"},
  {"courseid" : "272", "coursename" : "Physics","coursedept" : "CMPE",  "coursedesc" : "Environment Distrubuted System","courseroom" : "189","coursecapacity" : 40,"waitlistcapacity" : 40,"coursetemid":"add"},
  {"courseid" : "202", "coursename" : "Chemistry","coursedept" : "CMPE",  "coursedesc" : "Environment Distrubuted System","courseroom" : "189","coursecapacity" : 40,"waitlistcapacity" : 40,"coursetemid":"add"}
]

//Route to handle get Request Call
router.get('/',function(req,res){
    if (req.session.user) {
    var finalResult =0;
  console.log("Inside Enroll Login get Request");
  console.log("Req Body : ",req.body);
  

    res.end(JSON.stringify(courses));
    }
  });

  module.exports = router;