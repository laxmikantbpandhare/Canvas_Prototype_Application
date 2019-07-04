//Signup.js - Signup route module
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
//var mongo = require('mongodb');
var mongooseTypes = require('mongoose').Types;
//var Model = require('../DataBaseConnection');



//Kafka
var kafka = require('../kafka/client');

//Route to handle Post Request Call
router.post('/',function(req,res){

    console.log("Inside Login signup post Request");
    console.log("Req Body : ",req.body);

        //User creation query


    //req.body.sjsuId = mongooseTypes.ObjectId();

            //Check if user exists

            // if (req.body.isFaculty){
            //     console.log("if madhe");
            //     var userflag = 'Y';
            //  }
            //   else{
            //     console.log("else madhe");
            //      var userflag = 'N';
            //   }

    // Model.Userdetails.findOne({
    //     'sjsuid': req.body.sjsuId
    // }, (err, user) => {
    //     console.log("ala ka bagh ikade");
        
    //     if (err) {
    //         console.log("Unable to fetch user details.", err);
    //        // callback(err, null);            
    //     }
    //     else {

            // if (user) {
            //     console.log('User Exists!', user);
            //     // if(message.Accounttype === user.Accounttype){
            //         console.log('Duplicate user');
            //     //    callback(null, null);
            //     // }
            //     // else{
            //     //     user.Accounttype = 3;
            //     // }   
            // }

            // else {
            //    // console.log('Duplicateno user');
            //     //Hashing Password!
            //     console.log("in insert");
            //     const hashedPassword = bcrypt.hashSync(req.body.password);
            //     console.log(userflag);
            //     var user = new Model.Userdetails({
            //         sjsuid: req.body.sjsuId,
            //         password: hashedPassword,
            //         name: req.body.name,
            //         email: req.body.emailid,
            //         user_flag: userflag
            //     });
    //         }

    //         user.save().then((doc) => {

    //             console.log("User saved successfully.", doc);
    //           //  callback(null, doc);

    //         }, (err) => {
    //             console.log("Unable to save user details.", err);
    //            // callback(err, null);
    //         });

    //     }
    
    // });

    kafka.make_request('signup', req.body, function(err, result){
        console.log('In results Signup');
        console.log('Results: ', result);
        if(result){            
            console.log("User saved successfully.");
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('Adding a user successful!');
        }
        else if(result == null){
            console.log("User already exists.");
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