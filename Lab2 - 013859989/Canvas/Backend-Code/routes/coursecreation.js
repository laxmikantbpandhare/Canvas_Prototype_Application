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
router.post('/',requireAuth,function(req,res){
    if (req.session.user) {
  //  var finalResult =0;
  console.log("Inside course Creation Post Request");
  console.log("Req Body : ",req.body);

  Model.course_details .findOne({
    'courseid': req.body.courseid 
}, (err, user) => {
    
    
    if (err) {
        console.log("Unable to fetch Course details.", err);
        callback(err, null);            
    }
    else {

        if (user) {
            console.log('Course Exists!', user);
            // if(message.Accounttype === user.Accounttype){
                console.log('Duplicate Course');
                callback(null, null);
            // }
            // else{
            //     user.Accounttype = 3;
            // }   
        }

        else {

             console.log("message is here");
             var user = new Model.course_details({
                 courseid: req.body.courseid ,
                 coursename: req.body.coursename,
                 coursedept: req.body.coursedept,
                 coursedesc: req.body.coursedesc,
                 courseroom: req.body.courseroom,
                 coursecapacity:req.body.coursecapacity,
                 coursewaitlist:req.body.coursewaitlist,
                 courseterm:req.body.courseterm
             });
         }


         user.save().then((doc) => {

            console.log("Course saved successfully.", doc);
            callback(null, doc);

        }, (err) => {
            console.log("Unable to save Course details.", err);
            callback(err, null);
        });

    }

});
    }
        
  res.end(JSON.stringify(courses));
     // }
  });

  module.exports = router;