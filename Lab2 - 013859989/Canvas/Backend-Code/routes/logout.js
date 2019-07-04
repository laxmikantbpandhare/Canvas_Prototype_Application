

//Signup.js - Signup route module
var express = require('express');
var router = express.Router();
var session = require('express-session');

router.post('/',function(req,res){
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

  module.exports = router;