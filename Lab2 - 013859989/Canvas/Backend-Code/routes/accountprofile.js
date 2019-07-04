//Signup.js - Signup route module
var express = require('express');
var router = express.Router();
var Model = require('../DataBaseConnection');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});

//Route to handle Post Request Call
router.post('/',requireAuth,function(req,res){
    if (req.session.user) {
  console.log("Inside account profile Post Request");
  console.log("Req Body : ",req.body);
  

Model.Userdetails.findOne({
    'sjsuid': req.body.sjsuId
}, (err, user) => {


    if (err) {
        console.log("Unable to fetch user details.", err);
        callback(err, null);
    
    }
    else{
        console.log(user);
        res.end(JSON.stringify(user))
    }

    });




  
//     console.log(JSON.stringify(results));
//     res.end(JSON.stringify(results));

//   connection.end();
    }
  });

  module.exports = router;
  