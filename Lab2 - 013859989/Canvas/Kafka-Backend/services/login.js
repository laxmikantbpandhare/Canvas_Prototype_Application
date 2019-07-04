var Model = require('../DataBaseConnection');
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;


var logincheck = [
    {"finalstatus" : false, "facultyfnd" : false, "pwdvalidity" : false}
  ]

function handle_request(message, callback){
    console.log('Inside Kafka Backend Signup');
    console.log('Message: ', message);

    logincheck.filter(function(user){
        user.finalstatus = false;
        user.facultyfnd =  false;
        user.pwdvalidity = false
      })

  
      Model.Userdetails.findOne({
        'sjsuid': message.sjsuId
    }, (err, user) => {
  

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);
        }
        else {
          console.log(user);
          //console.log("User found");
          if(user){
            console.log("User details ", user);
            if (!bcrypt.compareSync(message.password, user.password)) {                
                console.log('Invalid Credentials!');
                //res.end(JSON.stringify(logincheck));
                callback(null, null);                
            }
            else {
              console.log('valid Credentials!');
              if(user.user_flag=="Y")
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
              logincheck.filter(function(user){
                user.pwdvalidity = true;
                user.finalstatus = true;
             })
             //res.end(JSON.stringify(logincheck));
                callback(null, user);
            }
        }
        }
  
      });

    }
    
    exports.handle_request = handle_request;