//Signup.js - Signup route module
var express = require('express');
var router = express.Router();
var Model = require('../DataBaseConnection');
var passport = require('passport');
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
  console.log("Inside enroll studnet Post Request");
  var concat = req.body.sjsuId + req.body.courseid;
  console.log(concat);

                 console.log("message is here");

                 var user = new Model.enroll_students({
                    sjsucourseid: concat,
                    coursedept: req.body.coursedept,
                    coursename: req.body.coursename,
                    sjsuid: req.body.sjsuId,
                    courseid: req.body.courseid
                 });
             }
    
    
             user.save().then((doc) => {
    
                console.log("Course saved successfully.", doc);
         //       callback(null, doc);
    
            }, (err) => {
                console.log("Unable to save Course details.", err);
       //         callback(err, null);
            });
    
  //      }
    
   // });
    
//               } 

res.end(JSON.stringify(courses));
  });

  module.exports = router;