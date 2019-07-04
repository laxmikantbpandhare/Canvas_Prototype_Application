var Model = require('../DataBaseConnection');
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;

function handle_request(message, callback){
    console.log('Inside Kafka Backend Signup');
    console.log('Message: ', message);

        //User creation query

    const profileid = mongooseTypes.ObjectId();

            //Check if user exists

            if (message.isFaculty){
                console.log("if madhe");
                var userflag = 'Y';
             }
              else{
                console.log("else madhe");
                 var userflag = 'N';
              }
           // var userflag = 'N';
              Model.Userdetails.findOne({
                'sjsuid': message.sjsuId
            }, (err, user) => {
                
                
                if (err) {
                    console.log("Unable to fetch user details.", err);
                    callback(err, null);            
                }
                else {

                    if (user) {
                        console.log('User Exists!', user);
                        // if(message.Accounttype === user.Accounttype){
                            console.log('Duplicate user');
                            callback(null, null);
                        // }
                        // else{
                        //     user.Accounttype = 3;
                        // }   
                    }

                    else {
                        // console.log('Duplicateno user');
                         //Hashing Password!
                         console.log("in insert");
                         const hashedPassword = bcrypt.hashSync(message.password);
                         console.log(userflag);
                         console.log("message is here");
                         console.log(message);
                         var user = new Model.Userdetails({
                             sjsuid: message.sjsuId,
                             password: hashedPassword,
                             name: message.name,
                             emailid: message.email,
                             user_flag: userflag,
                             profileid:profileid
                         });
                     }


                     user.save().then((doc) => {

                        console.log("User saved successfully.", doc);
                        callback(null, doc);
        
                    }, (err) => {
                        console.log("Unable to save user details.", err);
                        callback(err, null);
                    });
        
                }
            
            });
    }
    
    exports.handle_request = handle_request;